export const reverse_string = str => {
    if (!str) throw new Error("You must pass a string !")
    if (str.length == 1) return str
    let reversed = ''
    for (let i = str.length - 1; i >= 0; i--)
        reversed += str[i]
    return reversed
}
/*
export const reverse_string = str => {
    if (!str || str.length == 1) return str
    let reversed = ''
    str.split('').forEach(c => reversed = c + reversed)
    return reversed
}

export const reverse_string = str => {
    if (!str) return str
    return str.split('').reverse().join('')
}

export const reverse_string = str => {
    if (!str || str === "") return str
    return reverse_string(str.substr(1)) + str[0]
}*/