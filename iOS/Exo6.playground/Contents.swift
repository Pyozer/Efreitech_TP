func createFavString(_ fruit: String) -> String {
    return "My favorite fruit is \(fruit)"
}

let fruit: String? = "ananas"

// Method 1
let unwrapped1 = fruit ?? "ananas"
let myFavorite1 = createFavString(unwrapped1)
print(myFavorite1)

// Method 2
let unwrapped2 = fruit!
let myFavorite2 = createFavString(unwrapped2)
print(myFavorite2)

// Method 3
if let unwrapped3 = fruit {
    let myFavorite3 = createFavString(unwrapped3)
    print(myFavorite3)
}

// Method 4
func unwrap4(fruit: String?) -> String {
    guard let _fruit = fruit else {
        return "Fruit cannot be nil"
    }
    return createFavString(_fruit)
}

print(unwrap4(fruit: fruit))
