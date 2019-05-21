//
//  CharacterHeaderCell.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 21/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import SDWebImage

class CharacterHeaderCell : UITableViewCell {
    
    @IBOutlet weak var characterPicture: UIImageView!
    @IBOutlet weak var characterName: UILabel!
    @IBOutlet weak var characterActor: UILabel!
    
    func setData(_ character: HouseCharacter?) {
        characterPicture.sd_setImage(with: URL(string: character?.image ?? kDefaultImage))
        characterName.text = character?.name
        characterActor.text = character?.actor
    }
}
