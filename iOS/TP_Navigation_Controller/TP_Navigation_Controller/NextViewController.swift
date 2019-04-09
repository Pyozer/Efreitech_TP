//
//  NextViewController.swift
//  TP_Navigation_Controller
//
//  Created by Jean-Charles Moussé on 08/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class NextViewController : UIViewController {
    
    @IBOutlet weak var centeredLabel: UILabel!
    var name: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Next page"
        centeredLabel.text = name
    }
}
