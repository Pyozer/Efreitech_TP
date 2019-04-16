//
//  RequestManager.swift
//  PokeDex
//
//  Created by Jean-Charles Moussé on 15/04/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//
import Alamofire

typealias OnSuccess<T> = (_ response: T) -> Void
typealias OnFail = (_ error: Error?) -> Void

class RequestManager {
    private static func parseData<T: Decodable>(_ response: DataResponse<Data>, _ type: T.Type, _ onFail: @escaping OnFail) -> T? {
        if let _data = response.data, response.error == nil {
            if let _parsed = try? JSONDecoder().decode(type, from: _data) {
                return _parsed
            }
        }
        onFail(response.error)
        return nil
    }
    
    static func getPokedex(pokedexId: Int, onSuccess: @escaping OnSuccess<PokeDex>, onFail: @escaping OnFail) {
        Alamofire.request("https://pokeapi.co/api/v2/pokedex/\(pokedexId)").validate().responseData { response in
            if let _pokedex = parseData(response, PokeDex.self, onFail) {
                return onSuccess(_pokedex)
            }
        }
    }
    
    static func getPokemonSpecies(pokemonId: Int, onSuccess: @escaping OnSuccess<PokemonDetail>, onFail: @escaping OnFail) {
        Alamofire.request("https://pokeapi.co/api/v2/pokemon-species/\(pokemonId)").validate().responseData { response in
            if let _pokemon = parseData(response, PokemonDetail.self, onFail) {
                return onSuccess(_pokemon)
            }
        }
    }
}
