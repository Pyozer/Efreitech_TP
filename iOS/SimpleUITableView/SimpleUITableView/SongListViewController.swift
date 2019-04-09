//
//  SongListViewController.swift
//  SimpleUITableView
//
//  Created by Jean-Charles Moussé on 09/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//
import UIKit

class SongListViewController : UIViewController, UITableViewDataSource {
    
    @IBOutlet weak var tableView: UITableView!
    var songs : [Song] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        songs = [
            Song(title: "Musique 1", artiste: "Artiste 1"),
            Song(title: "Musique 2", artiste: "Artiste 1"),
            Song(title: "Musique 3", artiste: "Artiste 2"),
            Song(title: "Musique 4", artiste: "Artiste 1"),
            Song(title: "Musique 5", artiste: "Artiste 1"),
            Song(title: "Musique 6", artiste: "Artiste 3"),
            Song(title: "Musique 7", artiste: "Artiste 3"),
            Song(title: "Musique 8", artiste: "Artiste 2"),
            Song(title: "Musique 9", artiste: "Artiste 1"),
            Song(title: "Musique 10", artiste: "Artiste 4"),
            Song(title: "Musique 11", artiste: "Artiste 5"),
            Song(title: "Musique 12", artiste: "Artiste 4")
        ]
        self.tableView.dataSource = self
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.songs.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "tableViewCell", for: indexPath) as! SongCell
        let songData = songs[indexPath.row]
        cell.setData(song: songData)
        return cell
    }
}
