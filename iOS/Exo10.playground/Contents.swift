protocol Eatable {
    func eat()
}
protocol JunkFood {
    func makeMeFat()
}

class Banana : Eatable {
    func eat() {
        print("I Love Banana")
    }
}

class Pizza : Eatable, JunkFood {
    func eat() {
        print("I Love Pizza")
    }
    func makeMeFat() {
        print("It's just 2 more kilo")
    }
}

class Burger : Eatable, JunkFood {
    func eat() {
        print("I Love Burger")
    }
    func makeMeFat() {
        print("It's just 2 more kilo")
    }
}

let banana = Banana()
let pizza = Pizza()
let burger = Burger()

banana.eat()
pizza.eat()
burger.eat()

print("\n=== Array print ===\n")

let arrayEatable: [Eatable] = [banana, pizza, burger]
for eatable in arrayEatable {
    if let junkFood = eatable as? JunkFood {
        junkFood.makeMeFat()
    } else {
        eatable.eat()
    }
}
