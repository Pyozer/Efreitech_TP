var value: Int? = nil

func method(_ value: Int?) {
    guard let _value = value else {
        return print("Pas cool")
    }
    print("My value is worth \(_value)")
}

method(value)

value = 2
method(value)
