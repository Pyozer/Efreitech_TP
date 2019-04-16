//
//  PokemonViewController.swift
//  PokeDex
//
//  Created by Jean-Charles Moussé on 15/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import SDWebImage

class PokemonViewController: BaseViewController {
    
    @IBOutlet weak var progressView: UIActivityIndicatorView!
    @IBOutlet weak var contentView: UIStackView!
    @IBOutlet weak var pokemonImage: UIImageView!
    @IBOutlet weak var pokemonName: UILabel!
    @IBOutlet weak var pokemonHabitat: UILabel!
    @IBOutlet weak var pokemonColor: UILabel!
    @IBOutlet weak var pokemonShape: UILabel!
    @IBOutlet weak var pokemonDesc: UILabel!
    
    var pokemonSpecies: PokemonDetail?
    var pokemon: Pokemon?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initData()
    }
    
    private func initData() {
        if let _pokemon = pokemon {
            self.setVisibility(false, true)
            RequestManager.getPokemonSpecies(pokemonId: _pokemon.entryNumber, onSuccess: { pokemonSpecies in
                self.pokemonSpecies = pokemonSpecies
                self.updateView()
            }, onFail: { error in
                self.showAlert(error?.localizedDescription ?? "Cannot get pokemon data :/")
                self.setVisibility(false, false)
            })
        }
    }
    
    private func updateView() {
        if let _species = pokemonSpecies {
            pokemonName.text = _species.name.capitalize()
            pokemonHabitat.text = _species.habitat.name.capitalize()
            pokemonColor.text = _species.color.name.capitalize()
            pokemonShape.text = _species.shape.name.capitalize()
            pokemonDesc.text = _species.flavorTextEntries[5].flavorText
            pokemonImage.sd_setImage(with: URL(
                string: "https://pokeres.bastionbot.org/images/pokemon/\(pokemon!.entryNumber).png"
            ))
            self.setVisibility(true, false)
        }
    }
    
    @IBAction func onBackPressed(_ sender: UIButton) {
        self.navigationController?.popViewController(animated: true)
    }
    
    private func setVisibility(_ isContent: Bool, _ isProgress: Bool) {
        self.contentView.isHidden = !isContent
        self.progressView.isHidden = !isProgress
    }
    
}
