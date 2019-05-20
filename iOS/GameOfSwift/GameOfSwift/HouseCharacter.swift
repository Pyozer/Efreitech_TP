//
//  HouseCharacter.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import Foundation

class HouseCharacter: Codable {
    let titles: [String]
    let origin: [String]
    let siblings: [String]
    let spouse: [String]
    let lovers: [String]
    let plod: Int
    let longevity: [Int]
    let plodB: Double
    let plodC: Double
    let longevityB: [Double]
    let longevityC: [Double]
    let culture: [String]
    let religion: [String]
    let allegiances: [String]
    let seasons: [Int]
    let appearances: [String]
    let id: String
    let name: String
    let slug: String?
    let image: String?
    let gender: String?
    let alive: Bool?
    let death: Int?
    let father: String?
    let house: String?
    let firstSeen: String?
    let actor: String
    let related: [Related]
    let createdAt: String?
    let updatedAt: String?
    let v: Int?
    let pagerank: Pagerank?
    let age: Age?
    let houseCharacterID: String?
    
    enum CodingKeys: String, CodingKey {
        case titles = "titles"
        case origin = "origin"
        case siblings = "siblings"
        case spouse = "spouse"
        case lovers = "lovers"
        case plod = "plod"
        case longevity = "longevity"
        case plodB = "plodB"
        case plodC = "plodC"
        case longevityB = "longevityB"
        case longevityC = "longevityC"
        case culture = "culture"
        case religion = "religion"
        case allegiances = "allegiances"
        case seasons = "seasons"
        case appearances = "appearances"
        case id = "_id"
        case name = "name"
        case slug = "slug"
        case image = "image"
        case gender = "gender"
        case alive = "alive"
        case death = "death"
        case father = "father"
        case house = "house"
        case firstSeen = "first_seen"
        case actor = "actor"
        case related = "related"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
        case v = "__v"
        case pagerank = "pagerank"
        case age = "age"
        case houseCharacterID = "id"
    }
}

class Age: Codable {
    let name: String?
    let age: Int?
    
    enum CodingKeys: String, CodingKey {
        case name = "name"
        case age = "age"
    }
}

class Pagerank: Codable {
    let title: String?
    let rank: Int?
    
    enum CodingKeys: String, CodingKey {
        case title = "title"
        case rank = "rank"
    }
}

class Related: Codable {
    let id: String?
    let name: String?
    let slug: String?
    let mentions: Int?
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name = "name"
        case slug = "slug"
        case mentions = "mentions"
    }
}
