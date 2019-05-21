//
//  HouseViewController.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class HouseViewController: BaseViewController, UITableViewDelegate, UITableViewDataSource{
    
    @IBOutlet weak var emptyLabel: UILabel!
    @IBOutlet weak var charactersTableView: UITableView!
    var characters: [HouseCharacter] = []
    var house: House?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        charactersTableView.dataSource = self
        charactersTableView.delegate = self
        self.title = house?.name
        _fetchData()
    }
    
    func _fetchData() {
        if let _house = house {
            RequestManager.getHouseCharacters(houseName: _house.name, onSuccess: { characters in
                self.characters = characters
                self.charactersTableView.reloadData()
                let isEmpty = self.characters.count == 0
                self.emptyLabel.isHidden = !isEmpty
                self.charactersTableView.isHidden = isEmpty
            }, onFail: { error in
                self.showAlert(error?.localizedDescription ?? "Cannot get GOT house characters data :/")
            })
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return characters.count;
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "characterCell", for: indexPath) as! CharacterCell
        cell.setData(character: characters[indexPath.row])
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        // Segue to the second view controller
        self.performSegue(withIdentifier: "ShowCharacterView", sender: tableView.cellForRow(at: indexPath))
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let cell = sender as? UITableViewCell, let indexPath = charactersTableView.indexPath(for: cell) {
            // get a reference to the second view controller
            let characterViewController = segue.destination as! CharacterViewController
            // set a variable in the second view controller with the data to pass
            characterViewController.character = characters[indexPath.row]
        }
    }
}
