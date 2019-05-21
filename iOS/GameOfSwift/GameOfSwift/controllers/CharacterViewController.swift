//
//  CharacterViewController.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class CharacterViewController: BaseViewController, UITableViewDataSource, UITableViewDelegate {
    
    @IBOutlet weak var characterTableView: UITableView!
    
    var character: HouseCharacter?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        characterTableView.dataSource = self
        characterTableView.delegate = self
        self.title = character?.name
    }
    
    func tableView(_ tableView: UITableView, willDisplayHeaderView view: UIView, forSection section: Int) {
        if let headerView = view as? UITableViewHeaderFooterView {
            headerView.contentView.backgroundColor = .white
            headerView.textLabel?.font = UIFont.systemFont(
                ofSize: 20.0,
                weight: UIFont.Weight(rawValue: 400)
            )
        }
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if section == 1 {
            return "Titles"
        }
        if section == 2 {
            return "Sibling"
        }
        return nil
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        let titles = character?.titles.isEmpty ?? true ? 0 : 1
        let siblings = character?.siblings.isEmpty ?? true ? 0 : 1
        return 1 + titles + siblings
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0 {
            return 1
        }
        if section == 1 {
            return character?.titles.count ?? 0
        }
        if section == 2 {
            return character?.siblings.count ?? 0
        }
        return 0;
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.section == 0 {
            let cell = tableView.dequeueReusableCell(withIdentifier: "CharacterHeaderCell", for: indexPath) as! CharacterHeaderCell
            cell.setData(character)
            return cell
        }
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "CharacterInfoCell", for: indexPath)
        if indexPath.section == 1 {
            cell.textLabel?.text = character?.titles[indexPath.row]
        } else if indexPath.section == 2 {
            cell.textLabel?.text = character?.siblings[indexPath.row]
        }
        return cell
    }
}
