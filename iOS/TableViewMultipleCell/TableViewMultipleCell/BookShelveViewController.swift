//
//  BookShelveViewController.swift
//  TableViewMultipleCell
//
//  Created by Jean-Charles Moussé on 09/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class BookShelveViewController : UIViewController, UITableViewDataSource {
    
    @IBOutlet weak var tableView: UITableView!
    
    let bookUser = BookUser(
        name: "User",
        surname: "Surname",
        age: 20,
        books: [
            Book(title: "Book title 1", author: "Author 1", nbOfPages: 2),
            Book(title: "Book title 2", author: "Author 1", nbOfPages: 10),
            Book(title: "Book title 3", author: "Author 2", nbOfPages: 5),
            Book(title: "Book title 4", author: "Author 3", nbOfPages: 30),
            Book(title: "Book title 5", author: "Author 3", nbOfPages: 17)
        ]
    )
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.register(UINib(nibName: "BookShelveHeaderCell", bundle: nil), forCellReuseIdentifier: "headerCell")
        tableView.register(UINib(nibName: "BookCell", bundle: nil), forCellReuseIdentifier: "cell")
        tableView.rowHeight = UITableView.automaticDimension
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return bookUser.books.count + 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.row == 0 { // If first row, so the header
            let _cell = tableView.dequeueReusableCell(withIdentifier: "headerCell", for: indexPath) as! BookShelveHeaderCell
            _cell.setData(bookUser: bookUser)
            return _cell
        }
        
        let _cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! BookCell
        let data = bookUser.books[indexPath.row - 1]
        _cell.setData(book: data)
        return _cell
    }
}
