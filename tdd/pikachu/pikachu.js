export const pikachu = number => {
    if (typeof number !== "number")
        throw new Error("You must pass an integer !")

    const divBy3 = number % 3 === 0
    const divBy5 = number % 5 === 0

    if (divBy3)
        return divBy5 ? "PikaChu" : "Pika"
    else if (divBy5)
        return "Chu"
    return number
}