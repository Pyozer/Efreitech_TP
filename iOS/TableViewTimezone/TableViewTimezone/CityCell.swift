//
//  CityCell.swift
//  TableViewTimezone
//
//  Created by Jean-Charles Moussé on 16/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import Foundation

class CityCell: UITableViewCell {
    
    @IBOutlet weak var cityLabel: UILabel!
    @IBOutlet weak var timezoneLabel: UILabel!
    
    func setData(city: String, timezone: String) {
        cityLabel.text = city
        timezoneLabel.text = timezone
    }
}
