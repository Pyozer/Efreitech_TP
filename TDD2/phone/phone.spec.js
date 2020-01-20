import { phoneNumberSanitizer } from './phone';

describe('phone', () => {
  [
    { input: '0601020304', output: '0601020304' },
    { input: '06 01 02 03 04', output: '0601020304' },
    { input: '06.01.02.03.04', output: '0601020304' },
    { input: '06-01-02-03-04', output: '0601020304' },
    { input: '06/01/02/03/04', output: '0601020304' },
    { input: '+336/01/02/03/04', output: '0601020304' },
    { input: '+336 01 02 03 04', output: '0601020304' },
    { input: '0033601020304', output: '0601020304' },
    { input: '00336 01 02 03 04', output: '0601020304' },
    { input: '00336 01 02 03 04', output: '0601020304' },
    { input: '07 10 21 33 99', output: '0710213399' },
    { input: '+337 10 21 33 99', output: '0710213399' },
    { input: '00337 10 21 33 99', output: '0710213399' },
  ].forEach(({ input, output }) => {
    test(`it returns "${output}" for "${input}"`, () => {
      expect(phoneNumberSanitizer(input)).toBe(output);
    });
  });

  ['06010203', '+3306010203', '07123456789', '', null, undefined].forEach((phone) => {
    test(`it should throw an exception for "${phone}"`, () => {
      expect(() => phoneNumberSanitizer(phone)).toThrowError();
    });
  });
});
