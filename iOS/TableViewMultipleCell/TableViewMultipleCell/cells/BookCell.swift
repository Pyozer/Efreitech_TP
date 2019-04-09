//
//  BookCell.swift
//  TableViewMultipleCell
//
//  Created by Jean-Charles Moussé on 09/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class BookCell : UITableViewCell {
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var authorLabel: UILabel!
    @IBOutlet weak var pagesLabel: UILabel!
    
    func setData(book: Book) {
        titleLabel.text = book.title
        authorLabel.text = book.author
        pagesLabel.text = "\(book.nbOfPages)"
    }
}
