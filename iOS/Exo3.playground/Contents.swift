var arrayStr: [String] = ["String 1", "String 2", "String 3", "String 4"]
arrayStr.append("String 5")

func displayFirst(array: [String]) {
    print(array.first ?? "")
}
displayFirst(array: arrayStr)

displayFirst(array: [])

func displayAll(array: [String]) {
    array.forEach({ element in print(element)})
}
displayAll(array: arrayStr)
