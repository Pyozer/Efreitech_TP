//
//  PokeDex.swift
//  PokeDex
//
//  Created by Jean-Charles Moussé on 15/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

struct PokeDex: Codable {
    let id: Int
    let isMainSeries: Bool
    let name: String
    let pokemons: [Pokemon]
    
    enum CodingKeys: String, CodingKey {
        case id
        case isMainSeries = "is_main_series"
        case name
        case pokemons = "pokemon_entries"
    }
}
