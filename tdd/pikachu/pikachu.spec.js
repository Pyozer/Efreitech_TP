import { pikachu } from './pikachu'
import TestCase from '../TestCase'

describe("Pikachu", () => {
    describe("Common cases", () => {
        const testValues = [
            new TestCase(15, "PikaChu", "Pass 15 (divisible by 3 and 5) and should return 'PikaChu'"),
            new TestCase(6000, "PikaChu", "Pass 6000 (divisible by 3 and 5) and should return 'PikaChu'"),
            new TestCase(3, "Pika", "Pass 3 (divisible by 3 and not 5) and should return 'Pika'"),
            new TestCase(9003, "Pika", "Pass 9003 (divisible by 3 and not 5) and should return 'Pika'"),
            new TestCase(10, "Chu", "Pass 10 (divisible by 5 and not 3) and should return 'Chu'"),
            new TestCase(10505, "Chu", "Pass 10505 (divisible by 5 and not 3) and should return 'Chu'"),
            new TestCase(98, 98, "Pass 98 (not divisible by 3 and 5) and should return '98'"),
            new TestCase(89.5, 89.5, "Pass 98.5 (not divisible by 3 and 5) and should return 98.5"),
            new TestCase(0, "PikaChu")
        ]

        testValues.forEach(({ input, output, desc }) => {
            test(desc, () => {
                expect(pikachu(input)).toEqual(output)
            })
        })
    })

    describe("Exceptions cases", () => {
        test("Pass 'NotAnInteger' and should throw an Exception", () => {
            expect(() => pikachu("NotAnInteger")).toThrow(Error)
        })
    })
})