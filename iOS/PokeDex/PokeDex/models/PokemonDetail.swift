//
//  PokemonDetail.swift
//  PokeDex
//
//  Created by Jean-Charles Moussé on 15/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

struct PokemonDetail: Codable {
    let color: Info
    let flavorTextEntries: [FlavorTextEntry]
    let habitat: Info
    let id: Int
    let name: String
    let shape: Info
    
    enum CodingKeys: String, CodingKey {
        case color
        case flavorTextEntries = "flavor_text_entries"
        case habitat
        case id
        case name
        case shape
    }
}

struct Info: Codable {
    let name: String
    let url: String
}

struct FlavorTextEntry: Codable {
    let flavorText: String
    let language, version: Info
    
    enum CodingKeys: String, CodingKey {
        case flavorText = "flavor_text"
        case language, version
    }
}
