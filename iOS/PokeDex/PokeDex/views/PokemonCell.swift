//
//  PokemonCell.swift
//  PokeDex
//
//  Created by Jean-Charles Moussé on 15/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import SDWebImage

class PokemonCell : UITableViewCell {
    
    @IBOutlet weak var pokemonId: UILabel!
    @IBOutlet weak var pokemonName: UILabel!
    @IBOutlet weak var pokemonImage: UIImageView!
    
    func setPokemonData(data: Pokemon) {
        pokemonId.text = "\(data.entryNumber)".leftPadding(toLength: 3, withPad: "0")
        pokemonName.text = data.pokemonSpecies.name.capitalize()
        pokemonImage.sd_setImage(with: URL(
            string: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/\(data.entryNumber).png")
        )
    }
}

extension String {
    func leftPadding(toLength: Int, withPad character: Character) -> String {
        return String(repeatElement(character, count: max(0, toLength - self.count))) + self
    }
    
    func capitalize() -> String {
        return prefix(1).uppercased() + self.lowercased().dropFirst()
    }
}
