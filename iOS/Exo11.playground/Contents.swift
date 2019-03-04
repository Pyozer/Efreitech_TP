let completion: (String?) -> () = {(value) in
    guard let _value = value else {
        print("Value is nil")
        return
    }
    print(_value.uppercased())
}

func callWebService(isSuccess: Bool, completion: (String?) -> ()) {
    completion(isSuccess ? "My JSON String" : nil)
}

callWebService(isSuccess: true, completion: completion)
callWebService(isSuccess: false, completion: completion)
