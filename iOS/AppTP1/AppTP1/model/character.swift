//
//  character.swift
//  AppTP1
//
//  Created by Jean-Charles Moussé on 12/02/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

class Character {
    var name: String
    var role: CharacterRole
    
    init(name: String, role: CharacterRole) {
        self.name = name
        self.role = role
    }
    
    func getRoleString() -> String {
        return role.rawValue
    }
    
    func introduce() -> String {
        return "Ladies and gentlemens, this is \(name) a \(getRoleString()) !"
    }
}
