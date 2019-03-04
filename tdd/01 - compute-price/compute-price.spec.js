import { computePrice, INCORRECT_TYPE, INCORRECT_PRODUCTS, NEGATIVE_FORBIDDEN, ZERO_FORBIDDEN, MAXIMUM_5_ORDER } from './compute-price'

class Order {
    constructor(price, quantity) {
        this.price = price
        this.quantity = quantity
    }
}

describe("Computer Price", () => {
    describe("Commun cases", () => {
        test("Pass nothing in parameter, it should return 0", () => {
            expect(computePrice()).toEqual(0)
        })

        test("Pass order with price 1 / quantity 2 in parameter, it should return 2", () => {
            const orders = [new Order(1, 2)]
            expect(computePrice(orders)).toEqual(2)
        })

        test("Pass orders with price 1 / quantity 2 and price 10 / quantity 5 in parameter, it should return 52", () => {
            const orders = [
                new Order(1, 2),
                new Order(10, 5)
            ]
            expect(computePrice(orders)).toEqual(52)
        })

        test("Pass orders with price 9.99 / quantity 2 and price 24.99 / quantity 1 in parameter, it should return 44.96", () => {
            const orders = [
                new Order(9.99, 2),
                new Order(24.98, 1)
            ]
            expect(computePrice(orders)).toEqual(44.96)
        })
    })

    describe("Exception cases", () => {
        test(`Pass incorrect type in parameter, it should throw an Error ${INCORRECT_TYPE}`, () => {
            expect(() => computePrice(12)).toThrow(new Error(INCORRECT_TYPE))
        })

        test(`Pass incorrect type in parameter, it should throw an Error ${INCORRECT_TYPE}`, () => {
            expect(() => computePrice({})).toThrow(new Error(INCORRECT_TYPE))
        })

        test(`Pass incorrect products in parameter, it should throw an Error ${INCORRECT_PRODUCTS}`, () => {
            expect(() => computePrice([{ key: "value" }])).toThrow(new Error(INCORRECT_PRODUCTS))
        })

        test(`Pass negative numbers in orders values in parameter, it should throw an Error ${NEGATIVE_FORBIDDEN}`, () => {
            const orders = [
                new Order(3, 5),
                new Order(-3, 5),
            ]
            expect(() => computePrice(orders)).toThrow(new Error(NEGATIVE_FORBIDDEN))
        })

        test(`Pass negative numbers in orders values in parameter, it should throw an Error ${NEGATIVE_FORBIDDEN}`, () => {
            const orders = [
                new Order(10, 5),
                new Order(9.99, -5),
            ]
            expect(() => computePrice(orders)).toThrow(new Error(NEGATIVE_FORBIDDEN))
        })

        test(`Pass zero numbers in orders values in parameter, it should throw an Error ${ZERO_FORBIDDEN}`, () => {
            const orders = [
                new Order(10, 0),
                new Order(9.99, -5),
            ]
            expect(() => computePrice(orders)).toThrow(new Error(ZERO_FORBIDDEN))
        })

        test(`Pass incorrect price type in orders values in parameter, it should throw an Error ${INCORRECT_TYPE}`, () => {
            const orders = [
                new Order("NotNumber", 1),
            ]
            expect(() => computePrice(orders)).toThrow(new Error(INCORRECT_TYPE))
        })

        test(`Pass incorrect quantity type in orders values in parameter, it should throw an Error ${INCORRECT_TYPE}`, () => {
            const orders = [
                new Order(19.99, {}),
            ]
            expect(() => computePrice(orders)).toThrow(new Error(INCORRECT_TYPE))
        })

        test(`Pass more than 5 orders in parameter, it should throw an Error ${MAXIMUM_5_ORDER}`, () => {
            const orders = Array.from(Array(10).keys()).map(_ => new Order(9.99, 2))
            expect(() => computePrice(orders)).toThrow(new Error(MAXIMUM_5_ORDER))
        })
    })
})