import { Pool } from "pg";
import { defaults, seedAppointments, today, type Appointment, type Settings } from "./domain";

export type ClinicData = { appointments: Appointment[]; settings: Settings; waitlist: { id: string; name: string; phone: string; service: string }[] };
const globalDb = globalThis as unknown as { ghobadiPool?: Pool; ghobadiInit?: Promise<void> };
export const pool = globalDb.ghobadiPool ??= new Pool({ connectionString: process.env.GHOBADI_DATABASE_URL || "postgresql://ghobadi_demo:ghobadi_local_demo_only@127.0.0.1:55440/ghobadi", max: 5, connectionTimeoutMillis: 5000, idleTimeoutMillis: 10000 });
export async function initialize() {
  if (!globalDb.ghobadiInit) globalDb.ghobadiInit = (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("SELECT pg_advisory_xact_lock(5544001)");
      await client.query("CREATE TABLE IF NOT EXISTS ghobadi_state (id integer PRIMARY KEY CHECK (id = 1), data jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())");
      await client.query("CREATE TABLE IF NOT EXISTS ghobadi_audit (id bigserial PRIMARY KEY, action text NOT NULL, record_id text, created_at timestamptz NOT NULL DEFAULT now())");
      await client.query("INSERT INTO ghobadi_state (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO NOTHING", [JSON.stringify({ appointments: seedAppointments(today()), settings: defaults, waitlist: [] })]);
      await client.query("COMMIT");
    } catch (e) { await client.query("ROLLBACK"); throw e; } finally { client.release(); }
  })().catch(e => { globalDb.ghobadiInit = undefined; throw e; });
  await globalDb.ghobadiInit;
}
