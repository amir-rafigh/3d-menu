import { randomUUID } from "node:crypto";
import { initialize, pool, type ClinicData } from "../../ghobadi/database";
import { addDays, doctors, minutes, normalize, serviceOf, services, slotAvailable, today, type Appointment, type Status } from "../../ghobadi/domain";

class InputError extends Error { constructor(message: string, public status = 400) { super(message); } }
const response = (data: unknown, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
function text(value: unknown, max: number, required = true) { if (typeof value !== "string" || value.length > max || (required && !value.trim())) throw new InputError("اطلاعات واردشده معتبر نیست."); return value.trim(); }
function phoneOf(value: unknown) { const phone = normalize(text(value, 11)); if (!/^09\d{9}$/.test(phone)) throw new InputError("شماره موبایل معتبر ۱۱ رقمی وارد کنید."); return phone; }
function serviceId(value: unknown) { const id = text(value, 20); if (!services.some(s => s.id === id)) throw new InputError("خدمت معتبر نیست."); return id; }

export async function GET() {
  try { await initialize(); const result = await pool.query("SELECT data FROM ghobadi_state WHERE id = 1"); return response(result.rows[0].data); }
  catch { return response({ error: "اتصال به دیتابیس برقرار نشد. کانتینر داکر مطب را بررسی کنید." }, 503); }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return response({ error: "درخواست از مبدا نامعتبر است." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return response({ error: "فرمت درخواست معتبر نیست." }, 415);
  let client;
  try {
    const raw = await request.text(); if (raw.length > 12000) throw new InputError("حجم درخواست بیش از حد مجاز است.", 413);
    let body; try { body = JSON.parse(raw); } catch { throw new InputError("ساختار درخواست معتبر نیست."); }
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new InputError("ساختار درخواست معتبر نیست.");
    const { action, payload: p } = body;
    if (!p || typeof p !== "object" || Array.isArray(p)) throw new InputError("اطلاعات درخواست کامل نیست.");
    await initialize(); client = await pool.connect(); await client.query("BEGIN");
    // A row lock serializes all capacity checks and writes, including different doctors sharing two chairs.
    const result = await client.query("SELECT data FROM ghobadi_state WHERE id = 1 FOR UPDATE");
    const data: ClinicData = result.rows[0].data;
    let recordId = "";
    if (action === "book") {
      if (p.consent !== true) throw new InputError("پذیرش شرایط رزرو ضروری است.");
      const service = serviceId(p.service), doctor = text(p.doctor, 20), date = text(p.date, 10), time = text(p.time, 5);
      const name = text(p.name, 80), phone = phoneOf(p.phone);
      if (name.length < 3 || !doctors.some(d => d.id === doctor) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:(00|30)$/.test(time) || Number.isNaN(Date.parse(date + "T12:00:00Z")) || new Date(date + "T12:00:00Z").toISOString().slice(0, 10) !== date) throw new InputError("مشخصات نوبت معتبر نیست.");
      if (date < today() || date >= addDays(today(), 14)) throw new InputError("رزرو فقط برای امروز تا ۱۴ روز آینده امکان‌پذیر است.");
      const old = p.id ? data.appointments.find(a => a.id === p.id) : undefined;
      if (p.id && !old) throw new InputError("نوبت قبلی پیدا نشد.", 404);
      if (old && !["confirmed", "arrived"].includes(old.status)) throw new InputError("این نوبت قابل جابه‌جایی نیست.");
      if (old?.paid && old.service !== service) throw new InputError("برای نوبت تسویه‌شده فقط زمان یا پزشک را تغییر دهید.");
      if (!slotAvailable(date, time, doctor, service, data.appointments, data.settings, old?.id)) throw new InputError("این زمان دیگر در دسترس نیست؛ لطفاً زمان دیگری انتخاب کنید.", 409);
      if (data.appointments.some(a => a.id !== old?.id && a.phone === phone && a.date === date && !["cancelled", "no-show"].includes(a.status) && minutes(time) < minutes(a.time) + serviceOf(a.service).duration && minutes(time) + serviceOf(service).duration > minutes(a.time))) throw new InputError("این بیمار در این زمان نوبت دیگری دارد.", 409);
      recordId = old?.id || `GHB-${randomUUID().slice(0, 8).toUpperCase()}`;
      const appointment: Appointment = { id: recordId, name, phone, service, doctor, date, time, status: "confirmed", paid: old?.paid || false, insurance: text(p.insurance, 60), note: text(p.note, 500, false), reminder: data.settings.reminder, consentAt: new Date().toISOString() };
      if (old) data.appointments[data.appointments.findIndex(a => a.id === old.id)] = appointment; else data.appointments.push(appointment);
    } else if (action === "update") {
      recordId = text(p.id, 60); const a = data.appointments.find(a => a.id === recordId); if (!a) throw new InputError("نوبت پیدا نشد.", 404);
      const transitions: Record<Status, Status[]> = { confirmed: ["arrived", "cancelled", "no-show"], arrived: ["completed", "cancelled", "no-show"], completed: [], cancelled: [], "no-show": [] };
      if (p.status !== undefined) {
        if (!transitions[a.status].includes(p.status)) throw new InputError("این تغییر وضعیت مجاز نیست.");
        if (["arrived", "completed", "no-show"].includes(p.status) && a.date > today()) throw new InputError("ثبت مراجعه یا عدم مراجعه برای روزهای آینده مجاز نیست.");
        a.status = p.status;
      }
      if (p.paid !== undefined) { if (p.paid !== true || ["cancelled", "no-show"].includes(a.status)) throw new InputError("ثبت پرداخت برای این نوبت مجاز نیست."); a.paid = true; }
      if (p.reminder !== undefined) { if (typeof p.reminder !== "boolean") throw new InputError("تنظیم یادآوری معتبر نیست."); a.reminder = p.reminder; }
    } else if (action === "settings") {
      if (![8, 9, 10].includes(p.open) || ![17, 18, 19, 20, 21].includes(p.close) || typeof p.reminder !== "boolean") throw new InputError("ساعات کاری معتبر نیست.");
      data.settings = { open: p.open, close: p.close, reminder: p.reminder, clinic: text(p.clinic, 80) };
    } else if (action === "waitlist") {
      const phone = phoneOf(p.phone), service = serviceId(p.service), name = text(p.name, 80);
      if (name.length < 3) throw new InputError("نام باید حداقل ۳ حرف باشد.");
      if (data.waitlist.some(w => w.phone === phone && w.service === service)) throw new InputError("این درخواست قبلاً در لیست انتظار ثبت شده است.", 409);
      recordId = randomUUID(); data.waitlist.push({ id: recordId, name, phone, service });
    } else if (action === "remove-waitlist") {
      recordId = text(p.id, 60); data.waitlist = data.waitlist.filter(w => w.id !== recordId);
    } else throw new InputError("عملیات نامعتبر است.");
    await client.query("UPDATE ghobadi_state SET data = $1::jsonb, updated_at = now() WHERE id = 1", [JSON.stringify(data)]);
    await client.query("INSERT INTO ghobadi_audit (action, record_id) VALUES ($1, $2)", [action, recordId]);
    await client.query("COMMIT"); return response(data);
  } catch (e) {
    if (client) await client.query("ROLLBACK");
    return response({ error: e instanceof InputError ? e.message : "ذخیره اطلاعات ناموفق بود؛ اتصال پایگاه داده را بررسی کنید." }, e instanceof InputError ? e.status : 503);
  } finally { client?.release(); }
}
