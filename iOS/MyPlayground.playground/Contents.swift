import UIKit

let number1: Int = 1
let number2: Int = 2

var result: Int = 0
result = number1 +  number2
result *= 2

print("Resultat: \(result)")

func myMethod(argument: String) {
    print("My argument \(argument)")
}


myMethod(argument: "Test")
