//
//  CharacterViewController.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class CharacterViewController: BaseViewController, UITableViewDataSource {
    
    @IBOutlet weak var characterTableView: UITableView!
    @IBOutlet weak var characterImage: UIImageView!
    @IBOutlet weak var characterName: UILabel!
    @IBOutlet weak var characterActor: UILabel!
    
    var character: HouseCharacter?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        characterTableView.dataSource = self
        self.title = character?.name
        characterImage.sd_setImage(with: URL(string: character?.image ?? kDefaultImage))
        characterName.text = character?.name
        characterActor.text = character?.actor
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if section == 0 {
            return "Titles"
        }
        return "Sibling"
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        let isTitles = character?.titles.isEmpty ?? true ? 0 : 1
        let isSiblings = character?.siblings.isEmpty ?? true ? 0 : 1
        return isTitles + isSiblings
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0 {
            return character?.titles.count ?? 0
        }
        if section == 1 {
            return character?.siblings.count ?? 0
        }
        return 0;
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "characterInfoCell", for: indexPath)
        if indexPath.section == 0 {
            cell.textLabel?.text = character?.titles[indexPath.row]
        } else if indexPath.section == 1 {
            cell.textLabel?.text = character?.siblings[indexPath.row]
        }
        return cell
    }
}
