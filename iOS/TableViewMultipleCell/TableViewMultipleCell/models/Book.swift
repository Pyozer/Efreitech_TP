//
//  Book.swift
//  TableViewMultipleCell
//
//  Created by Jean-Charles Moussé on 09/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

class Book {
    var title: String
    var author: String
    var nbOfPages: Int
    
    init(title: String, author: String, nbOfPages: Int) {
        self.title = title
        self.author = author
        self.nbOfPages = nbOfPages
    }

}
