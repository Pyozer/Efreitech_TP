//
//  TimeViewController.swift
//  TableViewTimezone
//
//  Created by Jean-Charles Moussé on 16/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import Foundation

class TimeViewController: UIViewController {
    
    @IBOutlet weak var cityLabel: UILabel!
    @IBOutlet weak var timezoneLabel: UILabel!
    @IBOutlet weak var hourLabel: UILabel!
    
    var city: String?
    var timezone: String?
    
    override func viewDidLoad() {
        cityLabel.text = self.city
        timezoneLabel.text = self.timezone
        updateTime()
    }
    
    func updateTime() {
        if let _timezone = timezone {
            let formater = DateFormatter()
            formater.dateFormat = "MM-dd-yyyy HH:mm:ss"
            formater.timeZone = TimeZone(identifier: _timezone)
            
            hourLabel.text = formater.string(from: Date())
            
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                self.updateTime()
            }
        }
    }
}
