export const MAXIMUM_5_ORDER = "Too many orders!!!@@"
export const INCORRECT_TYPE = "Incorrect type"
export const INCORRECT_PRODUCTS = "Invalid order"
export const NEGATIVE_FORBIDDEN = "Negative values are forbidden"
export const ZERO_FORBIDDEN = "Zero values are forbidden."

export const computePrice = orders => {
    if (!orders) return 0

    if (typeof orders !== "object" || !Array.isArray(orders))
        throw new Error(INCORRECT_TYPE)

    if (orders.length > 5)
        throw new Error(MAXIMUM_5_ORDER)

    let totalPrice = 0
    orders.forEach(({ price, quantity }, index) => {
        if (price === 0 || quantity === 0)
            throw new Error(ZERO_FORBIDDEN)
        if (!price || !quantity)
            throw new Error(INCORRECT_PRODUCTS)
        if (typeof price !== "number" || typeof quantity !== "number")
            throw new Error(INCORRECT_TYPE)
        if (price < 0 || quantity < 0)
            throw new Error(NEGATIVE_FORBIDDEN)

        totalPrice = fixFloat(totalPrice + price * quantity)
    })
    return totalPrice
}

function fixFloat(float) {
    return parseFloat(float.toFixed(10))
}