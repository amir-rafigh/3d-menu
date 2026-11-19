import test from 'node:test';
import assert from 'node:assert/strict';
import { slotAvailable, normalize, addDays, today } from '../app/ghobadi/domain.ts';
const date = '2030-01-07';
const now = new Date('2030-01-06T00:00:00Z');
const a = (doctor, time, service = 'exam', status = 'confirmed') => ({ id: doctor + time, doctor, time, service, status, date });
const available = (time, doctor = 'ghobadi', service = 'exam', appointments = [], ignore = '') => slotAvailable(date, time, doctor, service, appointments, undefined, ignore, now);
test('normalizes both Persian and Arabic digits', () => assert.equal(normalize('۰۹۱٢٣٤٥٦٧٨٩'), '09123456789'));
test('Tehran date does not use the host timezone', () => assert.equal(today(new Date('2026-11-15T21:00:00Z')), '2026-11-16'));
test('date arithmetic crosses month and year boundaries', () => assert.equal(addDays('2026-12-31', 1), '2027-01-01'));
test('blocks Fridays, past times, lunch, closing and unqualified doctors', () => {
  assert.equal(slotAvailable('2030-01-04', '10:00', 'ghobadi', 'exam', [], undefined, '', new Date('2030-01-01')), false);
  assert.equal(slotAvailable(date, '10:00', 'ghobadi', 'exam', [], undefined, '', new Date('2030-01-08')), false);
  assert.equal(available('12:30'), false);
  assert.equal(available('13:00'), false);
  assert.equal(available('19:30'), false);
  assert.equal(available('10:00', 'ghobadi', 'root'), false);
});
test('keeps 15 minutes for cleaning and permits exact end boundary', () => {
  const rows = [a('ghobadi', '09:00')];
  assert.equal(available('09:30', 'ghobadi', 'exam', rows), false);
  assert.equal(available('10:00', 'ghobadi', 'exam', rows), true);
});
test('rescheduling ignores only the appointment being moved', () => {
  const rows = [a('ghobadi', '09:00')];
  assert.equal(available('09:00', 'ghobadi', 'exam', rows, rows[0].id), true);
});
test('cancelled appointments free capacity', () => assert.equal(available('09:00', 'ghobadi', 'exam', [a('ghobadi', '09:00', 'exam', 'cancelled')]), true));
test('shared chair capacity is two across all doctors', () => {
  assert.equal(available('09:00', 'ahmadi', 'exam', [a('ghobadi', '09:00')]), true);
  assert.equal(available('09:00', 'ahmadi', 'exam', [a('ghobadi', '09:00'), a('moradi', '09:00')]), false);
});
test('sequential bookings on one chair do not falsely exhaust capacity', () => {
  assert.equal(available('09:00', 'moradi', 'root', [a('ghobadi', '09:00'), a('ghobadi', '10:00')]), true);
});
