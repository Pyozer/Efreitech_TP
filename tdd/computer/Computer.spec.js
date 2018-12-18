import Computer from './Computer'

describe("Computer", () => {
    describe("Common cases", () => {
        const computer = new Computer()

        test("From 0, Add 3 and should return 3", () => {
            computer.sum(3)
            expect(computer.value).toEqual(3)
        })

        test("From 3, Add 3, 5 and 2 and should return 13", () => {
            computer.sum(3, 5, 2)
            expect(computer.value).toEqual(13)
        })

        test("From 13, Divide by 10 and should return 1.3", () => {
            computer.divide(10)
            expect(computer.value).toEqual(1.3)
        })

        test("From 1.3, Divide by 100 and should return 0.013", () => {
            computer.divide(100)
            expect(computer.value).toEqual(0.013)
        })

        test("From 0.013, Multiply by 1000 and should return 13", () => {
            computer.multiply(1000)
            expect(computer.value).toEqual(13)
        })

        test("Erase computer with 13 as value and should return 0", () => {
            computer.erase()
            expect(computer.value).toEqual(0)
        })

        test("From 0, Add 0.25 and 0.75, multiply by 10 and should return -10", () => {
            computer.sum(0.25, 0.75)
            computer.multiply(-10)
            expect(computer.value).toEqual(-10)
        })

        test("Erase computer, Add 4.5 and 10, multiply by 10, divide by 45 and should return 3.2222222222", () => {
            computer.erase()
            computer.sum(4.5, 10)
            computer.multiply(10)
            computer.divide(45)
            expect(computer.value).toEqual(3.2222222222)
        })

        test("Erase computer, Add 2 and Pow 2 and 2 and should return 16", () => {
            computer.erase()
            computer.sum(2)
            computer.pow(2, 2)
            expect(computer.value).toEqual(16)
        })

        test("Erase computer, Add 10 and Log and should return 1", () => {
            computer.erase()
            computer.sum(10)
            computer.log()
            expect(computer.value).toEqual(1)
        })

        test("Erase computer, Add 25, square and should return 5", () => {
            computer.erase()
            computer.sum(25)
            computer.sqrt()
            expect(computer.value).toEqual(5)
        })

        test("Erase computer, Add 4.51, round and should return 5", () => {
            computer.erase()
            computer.sum(4.51)
            computer.round()
            expect(computer.value).toEqual(5)
        })
    })

    describe("Exceptions cases", () => {
        const computer = new Computer()

        test("Add 'Number' to the computer with 0 as value should throw an Error", () => {
            expect(() => {
                computer.sum("Number")
            }).toThrow(Error)
        })

        test("Add 'Number' to the computer with 0 as value should throw an Error", () => {
            expect(() => {
                computer.sum("Number")
            }).toThrow(Error)
        })

        test("Divide nothing to the computer with 0 as value should throw an Error", () => {
            expect(() => {
                computer.divide()
            }).toThrow(Error)
        })

        test("Divide by 0 to the computer with 0 as value should throw an Error", () => {
            expect(() => {
                computer.divide(0)
            }).toThrow(Error)
        })

        test("Init computer with 'Number' should throw an Error", () => {
            expect(() => {
                new Computer("Number")
            }).toThrow(Error)
        })
    })
})