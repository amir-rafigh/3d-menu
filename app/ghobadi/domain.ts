export const services = [
  { id: "exam", name: "معاینه و مشاوره", duration: 30, price: 350000, icon: "tooth", detail: "بررسی سلامت دهان و تنظیم طرح درمان" },
  { id: "clean", name: "جرم‌گیری و بروساژ", duration: 45, price: 1200000, icon: "spark", detail: "مراقبت پیشگیرانه و سلامت لثه" },
  { id: "fill", name: "ترمیم دندان", duration: 60, price: 1800000, icon: "shield", detail: "ارزیابی پوسیدگی و ترمیم دندان" },
  { id: "root", name: "درمان ریشه", duration: 90, price: 4200000, icon: "heart", detail: "معاینه تخصصی و درمان کانال ریشه" },
  { id: "beauty", name: "مشاوره زیبایی", duration: 30, price: 500000, icon: "spark", detail: "بررسی لبخند، کامپوزیت و بلیچینگ" },
  { id: "implant", name: "مشاوره ایمپلنت", duration: 45, price: 500000, icon: "tooth", detail: "ارزیابی تخصصی و بررسی تصاویر" },
];
export const doctors = [
  { id: "ghobadi", name: "دکتر قبادی", specialty: "دندان‌پزشک · ترمیمی و زیبایی", initials: "ق", color: "green", services: ["exam", "clean", "fill", "beauty"] },
  { id: "moradi", name: "دکتر مرادی", specialty: "متخصص درمان ریشه", initials: "م", color: "purple", services: ["exam", "root"] },
  { id: "ahmadi", name: "دکتر احمدی", specialty: "جراحی و ایمپلنت", initials: "ا", color: "orange", services: ["exam", "implant"] },
];
export type Status = "confirmed" | "arrived" | "completed" | "cancelled" | "no-show";
export type Appointment = { id: string; name: string; phone: string; service: string; doctor: string; date: string; time: string; status: Status; paid: boolean; note: string; insurance: string; reminder: boolean; consentAt?: string };
export type Settings = { open: number; close: number; reminder: boolean; clinic: string };
export const defaults: Settings = { open: 9, close: 20, reminder: true, clinic: "مطب دندان‌پزشکی قبادی" };
export const fa = (value: number | string) => String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
export const money = (value: number) => new Intl.NumberFormat("fa-IR").format(value);
export const normalize = (value: string) => value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, d => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
export function today(now = new Date()) { return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit" }).format(now); }
export function addDays(date: string, count: number) { const d = new Date(date + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + count); return d.toISOString().slice(0, 10); }
export function dateLabel(date: string, options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) { return new Intl.DateTimeFormat("fa-IR", { ...options, timeZone: "Asia/Tehran" }).format(new Date(date + "T12:00:00Z")); }
export const minutes = (time: string) => { const [h, m] = time.split(":").map(Number); return h * 60 + m; };
export const serviceOf = (id: string) => services.find(s => s.id === id) || services[0];
export const doctorOf = (id: string) => doctors.find(d => d.id === id) || doctors[0];
export function slotAvailable(date: string, time: string, doctor: string, service: string, appointments: Appointment[], settings = defaults, ignoreId = "", now = new Date()) {
  if (!doctors.find(d => d.id === doctor)?.services.includes(service)) return false;
  if (new Date(date + "T12:00:00Z").getUTCDay() === 5) return false;
  const start = minutes(time), end = start + serviceOf(service).duration + 15;
  if (start < settings.open * 60 || end > settings.close * 60 || (start < 14 * 60 && end > 13 * 60)) return false;
  if (new Date(`${date}T${time}:00+03:30`).getTime() <= now.getTime()) return false;
  const overlaps = appointments.filter(a => a.id !== ignoreId && a.date === date && !["cancelled", "no-show"].includes(a.status) && start < minutes(a.time) + serviceOf(a.service).duration + 15 && end > minutes(a.time));
  if (overlaps.some(a => a.doctor === doctor)) return false;
  const events = overlaps.flatMap(a => [[Math.max(start, minutes(a.time)), 1], [Math.min(end, minutes(a.time) + serviceOf(a.service).duration + 15), -1]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let chairs = 0;
  for (const [, delta] of events) { chairs += delta; if (chairs >= 2) return false; }
  return true;
}
export function availableSlots(date: string, doctor: string, service: string, appointments: Appointment[], settings = defaults, ignoreId = "") {
  return Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`).filter(t => slotAvailable(date, t, doctor, service, appointments, settings, ignoreId));
}
export function seedAppointments(date: string): Appointment[] {
  const names = ["سارا محمدی", "علی رضایی", "نگار حسینی", "محمد کریمی", "مریم صادقی", "امیر موسوی", "الهام رحیمی", "آرمان نادری"];
  return names.map((name, i) => ({ id: `GHB-${1041 + i}`, name, phone: `0912000000${i}`, service: ["exam", "root", "clean", "implant", "fill", "exam", "beauty", "root"][i], doctor: ["ghobadi", "moradi", "ghobadi", "ahmadi", "ghobadi", "ahmadi", "ghobadi", "moradi"][i], date: i > 5 ? addDays(date, 1) : date, time: ["09:00", "09:30", "10:30", "11:30", "14:00", "15:30", "10:00", "14:30"][i], status: i < 2 ? "completed" : i === 2 ? "arrived" : "confirmed", paid: i < 2, note: "پرونده نمونه؛ اطلاعات ساختگی", insurance: i % 2 ? "آزاد" : "بیمه تکمیلی", reminder: true }));
}
