//
//  ViewController.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: BaseViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var houseTableView: UITableView!
    var houses: [House] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        houseTableView.dataSource = self
        houseTableView.delegate = self
        _fetchData()
    }
    
    func _fetchData() {
        RequestManager.getHouses(onSuccess: { houses in
            self.houses = houses
            self.houseTableView.reloadData()
        }, onFail: { error in
            self.showAlert(error?.localizedDescription ?? "Cannot get GOT Houses data :/")
        })
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return houses.count;
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "houseCell", for: indexPath) as! HouseCell
        let houseData = houses[indexPath.row]
        cell.setData(house: houseData)
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.performSegue(withIdentifier: "ShowHouseView", sender: tableView.cellForRow(at: indexPath))
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let cell = sender as? HouseCell, let indexPath = houseTableView.indexPath(for: cell) {
            let houseViewController = segue.destination as! HouseViewController
            houseViewController.house = houses[indexPath.row]
        }
    }
}
