export default class Computer {
    constructor(initValue = 0) {
        this.checkNumber(initValue)
        this._value = initValue
    }

    get value() {
        return this._value
    }

    set value(newVal) {
        this._value = parseFloat(newVal.toFixed(10))
    }

    sum(...numbers) {
        this.operationWrap(numbers, (prevValue, currValue) => prevValue + currValue)
    }

    divide(...numbers) {
        this.operationWrap(numbers, (prevValue, currValue) => {
            if (currValue === 0) throw new Error("You cannot divide by 0 !")
            return prevValue / currValue
        })
    }

    multiply(...numbers) {
        this.operationWrap(numbers, (prevValue, currValue) => prevValue * currValue)
    }

    pow(...pows) {
        this.operationWrap(pows, (prevValue, currValue) => Math.pow(prevValue, currValue))
    }

    log() {
        this.operationWrap([], (currValue) => Math.log10(currValue), false)
    }

    sqrt() {
        this.operationWrap([], (currValue) => Math.sqrt(currValue), false)
    }

    round() {
        this.operationWrap([], (currValue) => Math.round(currValue), false)
    }

    erase() {
        this.value = 0
    }

    operationWrap(numbers, operation, requiredParam = true) {
        if (requiredParam && (!numbers || numbers.length === 0))
            throw new Error("You must provide at least one parameter.")

        if (numbers.length === 0)
            this.value = operation(this.value)
        else
            this.value = this.reduceWrap(numbers, operation)
    }

    reduceWrap(numbers, operation) {
        return numbers.reduce((prevValue, currValue) => {
            this.checkNumber(currValue)
            return operation(prevValue, currValue)
        }, this.value)
    }

    checkNumber(number) {
        if (typeof number != "number")
            throw new Error("You must enter a number !")
    }
}