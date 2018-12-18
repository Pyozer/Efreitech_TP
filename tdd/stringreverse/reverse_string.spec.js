import { reverse_string } from './reverse_string'
import TestCase from '../TestCase'

describe('Reverse String', () => {
    const values = [
        new TestCase('Hello World !', '! dlroW olleH'),
        new TestCase('laval', 'laval'),
        new TestCase('lAvaL', 'LavAl'),
        new TestCase('Hello\nCa va ?', '? av aC\nolleH'),
        new TestCase('-1', '1-'),
        new TestCase('-1.08', '80.1-'),
        new TestCase('8', '8'),
        new TestCase('98', '89'),
        new TestCase('9 8', '8 9'),
        new TestCase('989', '989'),
        new TestCase('    ', '    '),
        new TestCase('  9    ', '    9  '),
        new TestCase('\n\n', '\n\n'),
    ]

    values.forEach(({ input, output, desc }) => {
        test(desc, () => {
            expect(reverse_string(input)).toEqual(output)
        })
    })

    /* Exception cases */

    test(`Pass null should throw an exception`, () => {
        expect(() => reverse_string(null)).toThrow()
    })
    test(`Pass undefined should throw an exception`, () => {
        expect(() => reverse_string(undefined)).toThrow()
    })

})