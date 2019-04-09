//
//  FirstViewController.swift
//  TP_Navigation_Controller
//
//  Created by Jean-Charles Moussé on 08/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Home Page"
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "nextScreen" {
            let nextViewController = segue.destination as! NextViewController
            nextViewController.name = "PodPak"
        }
    }
}
