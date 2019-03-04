//
//  ViewController.swift
//  AppTP2
//
//  Created by Jean-Charles Moussé on 13/02/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class MySelfViewController: UIViewController {
    @IBOutlet weak var presentationLabel: UILabel!
    @IBOutlet weak var fieldName: UITextField!
    @IBOutlet weak var fieldAge: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func presentAction(_ sender: UIButton) {
        if fieldName.text?.isEmpty ?? true || fieldAge.text?.isEmpty ?? true {
            presentationLabel.textColor = UIColor.red
            presentationLabel.text = "YOU MUST FILL ALL FIELDS !"
        } else {
            presentationLabel.textColor = UIColor.black
            presentationLabel.text = "Hi, my name is \(fieldName.text!) and Im \(fieldAge.text!) years old"
        }
    }
    
}

