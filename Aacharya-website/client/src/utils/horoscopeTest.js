import { getSignFromDateValue, getDynamicScore, getReadingSet, getSign } from './horoscopeUtils.js';

let failed = false;

// 1. Test Boundary Dates
const testDates = [
  { date: '2026-03-21', expected: 'Aries' },
  { date: '2026-04-19', expected: 'Aries' },
  { date: '2026-04-20', expected: 'Taurus' },
  { date: '2026-05-20', expected: 'Taurus' },
  { date: '2026-05-21', expected: 'Gemini' },
  { date: '2026-06-20', expected: 'Gemini' },
  { date: '2026-06-21', expected: 'Cancer' },
  { date: '2026-07-22', expected: 'Cancer' },
  { date: '2026-07-23', expected: 'Leo' },
  { date: '2026-08-22', expected: 'Leo' },
  { date: '2026-08-23', expected: 'Virgo' },
  { date: '2026-09-22', expected: 'Virgo' },
  { date: '2026-09-23', expected: 'Libra' },
  { date: '2026-10-22', expected: 'Libra' },
  { date: '2026-10-23', expected: 'Scorpio' },
  { date: '2026-11-21', expected: 'Scorpio' },
  { date: '2026-11-22', expected: 'Sagittarius' },
  { date: '2026-12-21', expected: 'Sagittarius' },
  { date: '2026-12-22', expected: 'Capricorn' },
  { date: '2027-01-19', expected: 'Capricorn' }, // Testing Jan wrap
  { date: '2027-01-20', expected: 'Aquarius' },
  { date: '2027-02-18', expected: 'Aquarius' },
  { date: '2027-02-19', expected: 'Pisces' },
  { date: '2027-03-20', expected: 'Pisces' }
];

console.log('--- Testing Date Boundaries ---');
testDates.forEach(({ date, expected }) => {
  const result = getSignFromDateValue(date);
  if (result !== expected) {
    console.error(`❌ Date ${date} failed. Expected ${expected}, got ${result}`);
    failed = true;
  } else {
    console.log(`✅ Date ${date} correctly mapped to ${expected}`);
  }
});

// 2. Test 365 Days Exhaustively
console.log('\n--- Exhaustive 365 Day Test (2025 non-leap year) ---');
const startDate = new Date('2025-01-01T12:00:00Z');
let unmappedDays = 0;
for (let i = 0; i < 365; i++) {
  const d = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
  const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  const sign = getSignFromDateValue(dateStr);
  if (!sign) {
    console.error(`❌ Date ${dateStr} returned an empty sign!`);
    unmappedDays++;
    failed = true;
  }
}
if (unmappedDays === 0) console.log('✅ All 365 days mapped successfully without gaps.');

// 3. Test Dynamic Consistency
console.log('\n--- Dynamic Consistency Check ---');
const seed1 = 'Aries-2026-04-29-daily';
const reading1 = getReadingSet('Aries', seed1, 'daily');
const reading2 = getReadingSet('Aries', seed1, 'daily');
if (reading1.overview === reading2.overview && reading1.love === reading2.love) {
  console.log('✅ Deterministic generation works (same seed = same output).');
} else {
  console.error('❌ Deterministic generation failed!');
  failed = true;
}

const seed3 = 'Aries-2026-04-30-daily';
const reading3 = getReadingSet('Aries', seed3, 'daily');
if (reading1.overview !== reading3.overview || reading1.love !== reading3.love) {
  console.log('✅ Day-to-day dynamic variation works (different seed = different output).');
} else {
  console.warn('⚠️ Different seeds produced identical outputs. Could be a coincidence, but check RNG spread.');
}

console.log('\nSample Output for Aries Today:');
console.log(reading1);

if (failed) {
  console.error('\n❌ SOME TESTS FAILED.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL TESTS PASSED.');
  process.exit(0);
}
