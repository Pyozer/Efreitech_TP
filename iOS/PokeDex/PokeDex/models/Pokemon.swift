//
//  Pokemon.swift
//  PokeDex
//
//  Created by Jean-Charles Moussé on 15/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

struct Pokemon: Codable {
    let entryNumber: Int
    let pokemonSpecies: PokemonInfo
    
    enum CodingKeys: String, CodingKey {
        case entryNumber = "entry_number"
        case pokemonSpecies = "pokemon_species"
    }
}

struct PokemonInfo: Codable {
    let name: String
    let url: String
}
