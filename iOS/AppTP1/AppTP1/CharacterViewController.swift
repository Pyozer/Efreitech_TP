//
//  ViewController.swift
//  AppTP1
//
//  Created by Jean-Charles Moussé on 12/02/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class CharacterViewController: UIViewController {
    @IBOutlet var label: UILabel!
    @IBOutlet var presentBtn: UIButton!
    
    var character: Character?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        character = Character(name: "Thanos", role: .Warrior)
        onErasePressed(self)
        
        self.view.backgroundColor = UIColor.red
        
        var _ = Timer.scheduledTimer(
            timeInterval: 0.02,
            target: self,
            selector: #selector(updateBackground),
            userInfo: nil,
            repeats: true
        )
    }
    
    @IBAction func onPresentPressed(_ sender: Any) {
        label.text = character?.introduce()
        presentBtn.setTitle("Erase presentation", for: .normal)
        presentBtn.addTarget(self, action: #selector(onErasePressed), for: .touchUpInside)
    }
    
    @IBAction func onErasePressed(_ sender: Any) {
        label.text = ""
        presentBtn.setTitle("Present character", for: .normal)
        presentBtn.addTarget(self, action: #selector(onPresentPressed), for: .touchUpInside)
    }
    
    @objc private func updateBackground() {
        let currentColor = self.view.backgroundColor?.cgColor ?? UIColor.red.cgColor
        
        var red = Int((currentColor.components![0] * 255).truncatingRemainder(dividingBy: 256))
        var green = Int((currentColor.components![1] * 255).truncatingRemainder(dividingBy: 256))
        var blue = Int((currentColor.components![2] * 255).truncatingRemainder(dividingBy: 256))
        
        if red == 255 && green >= 0 && green < 255 && blue == 0 { // (255, 0, 0) -> (255, 255, 0)
            green = green + 1
        } else if red <= 255 && red >= 0 && green == 255 && blue == 0 { // (255, 255, 0) -> (0, 255, 0)
            red = red - 1
        } else if red <= 255 && red > 0 && green == 255 && blue == 0 { // (0, 255, 0) -> (0, 255, 255)
            red = red - 1
        }
        
        self.view.backgroundColor = UIColor(red: red, green: green, blue: blue, alpha: 1.0)
    }
}
