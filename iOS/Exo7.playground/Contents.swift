enum Fruit {
    case 🍍
    case 🥝
    case 🍏
    case 🍓
    case 🍉
    case 🍐
    case 🥭
    
    func eat() {
        switch self {
            case .🍍: print("Ananas 🍍")
            case .🥝: print("Kiwi 🥝")
            case .🍏: print("Apple 🍏")
            case .🍓: print("Strawberry 🍓")
            case .🍉: print("Watermelon 🍉")
            case .🍐: print("Perry 🍐")
            case .🥭: print("Mango 🥭")
        }
    }
}

Fruit.🍍.eat()
Fruit.🥝.eat()
Fruit.🍏.eat()
Fruit.🍓.eat()
Fruit.🍉.eat()
Fruit.🍐.eat()
Fruit.🥭.eat()
