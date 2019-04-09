//
//  SimpleCell.swift
//  SimpleUITableView
//
//  Created by Jean-Charles Moussé on 09/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//
import UIKit

class SongCell : UITableViewCell {
    
    @IBOutlet weak var musicLabel: UILabel!
    @IBOutlet weak var artisteLabel: UILabel!
    
    func setData(song: Song) {
        musicLabel.text = song.title
        artisteLabel.text = song.artiste
    }
}
