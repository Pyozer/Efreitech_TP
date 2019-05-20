//
//  HouseCell.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import SDWebImage

class CharacterCell : UITableViewCell {
    
    @IBOutlet weak var characterName: UILabel!
    @IBOutlet weak var characterActor: UILabel!
    
    func setData(character: HouseCharacter) {
        characterName.text = character.name
        characterActor.text = character.actor
    }
}
