import test from 'ava';
import { validate } from './server';

test('Valid queries', t => {
  const cases = [
    { seed: '040f1148' },
    { seed: ['040f1148'] },
    { dot: '8' },
    { dot: ['10'] },
    { ppd: '25' }
  ];

  for (const testCase of cases) {
    t.notThrows(() => {
      validate(testCase);
    }, `Valid query ${JSON.stringify(testCase)}`);
  }
});

test('Invalid queries', t => {
  const cases = [
    { seed: 'invalid hex' },
    { dot: '4' },
    { dot: '14' },
    { dot: '7' },
    { ppd: '99999' },
    { ppd: '0' }
  ];

  for (const testCase of cases) {
    t.throws(
      () => {
        validate(testCase);
      },
      null,
      `Invalid query ${JSON.stringify(testCase)}`
    );
  }
});
