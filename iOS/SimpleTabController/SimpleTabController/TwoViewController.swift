//
//  TwoViewController.swift
//  SimpleTabController
//
//  Created by Jean-Charles Moussé on 09/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class TwoViewController: UIViewController {
    
    @IBAction func goNextController(_ sender: Any) {
        tabBarController?.selectedIndex = 2
    }
    
}
