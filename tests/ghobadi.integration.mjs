import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import pg from 'pg';
import { today, addDays } from '../app/ghobadi/domain.ts';
const base = process.env.GHOBADI_TEST_URL || 'http://localhost:3000';
const tag = 'TEST-' + randomUUID().slice(0, 7);
const pool = new pg.Pool({ connectionString: process.env.GHOBADI_DATABASE_URL || 'postgresql://ghobadi_demo:ghobadi_local_demo_only@127.0.0.1:55440/ghobadi' });
let date = addDays(today(), 9);
while (new Date(date + 'T12:00:00Z').getUTCDay() === 5) date = addDays(date, 1);
const payload = { id: '', name: tag, phone: '09999999001', service: 'exam', doctor: 'ghobadi', date, time: '10:00', insurance: 'آزاد', note: tag, consent: true };
const post = async (action, payload) => { const r = await fetch(base + '/api/ghobadi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, payload }) }); return { status: r.status, body: await r.json() }; };
try {
  assert.equal((await fetch(base + '/api/ghobadi')).status, 200);
  assert.equal((await post('book', {...payload, consent: false})).status, 400, 'server requires booking consent');
  const concurrent = await Promise.all([0, 1, 2].map(i => post('book', { ...payload, phone: `0999999900${i}` })));
  assert.deepEqual(concurrent.map(r => r.status).sort(), [200, 409, 409], 'same doctor concurrency');
  const first = concurrent.find(r => r.status === 200).body.appointments.find(a => a.name === tag);
  const second = await post('book', { ...payload, doctor: 'moradi', phone: '09999999004' });
  assert.equal(second.status, 200, 'second chair');
  assert.equal((await post('book', { ...payload, doctor: 'ahmadi', phone: '09999999005' })).status, 409, 'third chair rejected');
  assert.equal((await post('book', { ...payload, time: '14:00', phone: 'bad' })).status, 400, 'phone validation');
  assert.equal((await post('book', { ...payload, time: '13:00' })).status, 409, 'lunch rejected');
  assert.equal((await post('update', { id: first.id, status: 'completed' })).status, 400, 'invalid transition');
  assert.equal((await post('update', { id: first.id, status: 'arrived' })).status, 400, 'future arrival rejected');
  assert.equal((await post('update', { id: first.id, status: 'cancelled' })).status, 200, 'cancel');
  const rebook = await post('book', { ...payload, phone: '09999999006' });
  assert.equal(rebook.status, 200, 'cancelled capacity reusable');
  const rows = await (await fetch(base + '/api/ghobadi')).json();
  assert.equal(rows.appointments.filter(a => a.name === tag).length, 3, 'data persists across separate requests');
  assert.equal((await post('waitlist', { name: tag, phone: '09999999007', service: 'exam' })).status, 200);
  assert.equal((await post('waitlist', { name: tag, phone: '09999999007', service: 'exam' })).status, 409);
  const malformed = await fetch(base + '/api/ghobadi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: 'null' });
  assert.equal(malformed.status, 400);
  const crossOrigin = await fetch(base + '/api/ghobadi', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://invalid.example' }, body: '{}' });
  assert.equal(crossOrigin.status, 403);
  console.log('PASS: concurrency, two-chair capacity, validation, transitions, cancellation, persistence, waitlist, origin check.');
} finally {
  const client = await pool.connect();
  try { await client.query('BEGIN'); const { rows } = await client.query('SELECT data FROM ghobadi_state WHERE id=1 FOR UPDATE'); const data = rows[0].data; const ids = [...data.appointments, ...data.waitlist].filter(a => a.name === tag).map(a => a.id); data.appointments = data.appointments.filter(a => a.name !== tag); data.waitlist = data.waitlist.filter(a => a.name !== tag); await client.query('UPDATE ghobadi_state SET data=$1::jsonb WHERE id=1', [JSON.stringify(data)]); await client.query('DELETE FROM ghobadi_audit WHERE record_id = ANY($1::text[])', [ids]); await client.query('COMMIT'); } catch (e) { await client.query('ROLLBACK'); throw e; } finally { client.release(); await pool.end(); }
}
