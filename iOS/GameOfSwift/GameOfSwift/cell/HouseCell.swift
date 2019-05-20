//
//  HouseCell.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import SDWebImage

let kDefaultImage = "https://n-allo.be/wp-content/uploads/2016/08/ef3-placeholder-image-450x350.jpg"

class HouseCell : UITableViewCell {
    
    @IBOutlet weak var houseImage: UIImageView!
    @IBOutlet weak var houseName: UILabel!
    @IBOutlet weak var houseWords: UILabel!
    
    func setData(house: House) {
        houseImage.sd_setImage(with: URL(string: house.image ?? kDefaultImage))
        houseName.text = house.name
        houseWords.text = house.words ?? ""
    }
}
