//
//  ListViewController.swift
//  PokeDex
//
//  Created by Jean-Charles Moussé on 15/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class ListViewController: BaseViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var tablePokemons: UITableView!
    var pokedex: PokeDex?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tablePokemons.dataSource = self
        self.tablePokemons.delegate = self
        
        RequestManager.getPokedex(pokedexId: 2, onSuccess: { pokedex in
            self.pokedex = pokedex
            self.tablePokemons.reloadData()
        }, onFail: { error in
            self.showAlert(error?.localizedDescription ?? "Cannot get pokedex data :/")
        })
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return pokedex?.pokemons.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let _pokeDex = pokedex {
            let _cell = tableView.dequeueReusableCell(withIdentifier: "pokemonCell") as! PokemonCell
            _cell.setPokemonData(data: _pokeDex.pokemons[indexPath.row])
            return _cell
        }
        return UITableViewCell()
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        if let _pokedex = pokedex {
            let storyBoard = UIStoryboard(name: "Main", bundle:nil)
            let pokemonViewController = storyBoard.instantiateViewController(withIdentifier: "PokemonView") as! PokemonViewController
            pokemonViewController.pokemon = _pokedex.pokemons[indexPath.row]
            self.navigationController?.pushViewController(pokemonViewController, animated:true)
        }
    }
}
