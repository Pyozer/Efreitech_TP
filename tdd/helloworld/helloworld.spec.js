import { hello } from './helloworld'

describe("Hello", () => {
    test("It says 'Hello, World!'", () => {
        expect(hello()).toEqual("Hello, World!")
    })

    test("It says 'Hello, Ben!' when pass 'Ben' as first param", () => {
        expect(hello('Ben')).toEqual("Hello, Ben!")
    })

    test("It says 'Hello, World!' when pass null as first param", () => {
        expect(hello(null)).toEqual("Hello, World!")
    })

    test("It says 'Hello, World!' when pass undefined as first param", () => {
        let name;
        expect(hello(name)).toEqual("Hello, World!")
    })
})