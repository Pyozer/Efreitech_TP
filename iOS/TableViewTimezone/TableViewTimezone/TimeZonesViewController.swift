//
//  TimeZonesViewController.swift
//  TableViewTimezone
//
//  Created by Jean-Charles Moussé on 16/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class TimeZonesViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    @IBOutlet weak var tableView: UITableView!
    
    let timezones: [String] = TimeZone.knownTimeZoneIdentifiers
    
    var sections: [String] = []
    var cities: [String] = []
    
    var data: [String: [CityTimezone]] = [:]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.delegate = self
        tableView.dataSource = self
        
        let sections = (65...90).map({Character(UnicodeScalar($0))}).map {String($0)}
        for section in sections {
            data[section] = []
        }
        
        for timezone in TimeZone.knownTimeZoneIdentifiers {
            if let cityName = timezone.split(separator: "/").last {
                let section = cityName.first!
                data[section].
            }
        }
    }
    
    private func getCityTimezone(timezone: String) -> CityTimezone {
        let timezone = timezones[index]
        let city = String(timezone.split(separator: "/")[1])
        return CityTimezone(city: city, timezone: timezone)
    }
    
    override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return self.section\[section\]
        
    }
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return sections.count
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return timezones.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let data = getCityTimezone(index: indexPath.row)
        let cell = tableView.dequeueReusableCell(withIdentifier: "CityCell", for: indexPath) as! CityCell
        cell.setData(city: data.city, timezone: data.timezone)
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)

        let data = getCityTimezone(index: indexPath.row)
        let storyBoard = UIStoryboard(name: "Main", bundle:nil)
        let timeViewController = storyBoard.instantiateViewController(withIdentifier: "TimeView") as! TimeViewController
        timeViewController.city = data.city
        timeViewController.timezone = data.timezone
        self.navigationController?.pushViewController(timeViewController, animated:true)

    }
}

struct CityTimezone {
    var city: String
    var timezone: String
    
    init(city: String, timezone: String) {
        self.city = city
        self.timezone = timezone
    }
}
