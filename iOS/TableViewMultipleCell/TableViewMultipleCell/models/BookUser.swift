//
//  BookUser.swift
//  TableViewMultipleCell
//
//  Created by Jean-Charles Moussé on 09/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

class BookUser {
    var name: String
    var surname: String
    var age: Int
    var books: [Book]
    
    init(name: String, surname: String, age: Int, books: [Book]) {
        self.name = name
        self.surname = surname
        self.age = age
        self.books = books
    }
}
