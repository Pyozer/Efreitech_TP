//
//  BookShelveHeaderCell.swift
//  TableViewMultipleCell
//
//  Created by Jean-Charles Moussé on 09/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class BookShelveHeaderCell : UITableViewCell {
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var surnameLabel: UILabel!
    @IBOutlet weak var ageLabel: UILabel!
    @IBOutlet weak var bookCountLabel: UILabel!
    
    func setData(bookUser: BookUser) {
        nameLabel.text = bookUser.name
        surnameLabel.text = bookUser.surname
        ageLabel.text = "\(bookUser.age)"
        bookCountLabel.text = "\(bookUser.books.count)"
    }
}
