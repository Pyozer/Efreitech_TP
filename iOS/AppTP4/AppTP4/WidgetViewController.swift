//
//  ViewController.swift
//  AppTP4
//
//  Created by Jean-Charles Moussé on 13/02/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class WidgetViewController: UIViewController, WidgetDelegate {
    
    @IBOutlet weak var widgetView: WidgetView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        widgetView.delegate = self
    }
    
    func leftHaveBeenSelected() {
        print("Left pressed")
    }
    
    func rightHaveBeenSelected() {
        print("Right pressed")
    }
}
