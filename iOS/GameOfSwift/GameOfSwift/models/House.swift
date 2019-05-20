//
//  House.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import Foundation

class House: Codable {
    let titles: [String]
    let overlords: [String]
    let ancestralWeapon: [String]
    let id: String
    let name: String
    let image: String?
    let coatOfArms: String?
    let words: String?
    let currentLord: String?
    let seat: String?
    let region: String?
    let founded: String?
    let founder: String?
    let cadetBranch: String?
    let heir: String?
    let isExtinct: Bool
    let createdAt: String?
    let updatedAt: String?
    let v: Int
    
    enum CodingKeys: String, CodingKey {
        case titles = "titles"
        case overlords = "overlords"
        case ancestralWeapon = "ancestralWeapon"
        case id = "_id"
        case name = "name"
        case image = "image"
        case coatOfArms = "coatOfArms"
        case words = "words"
        case currentLord = "currentLord"
        case seat = "seat"
        case region = "region"
        case founded = "founded"
        case founder = "founder"
        case cadetBranch = "cadetBranch"
        case heir = "heir"
        case isExtinct = "isExtinct"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
        case v = "__v"
    }

}
