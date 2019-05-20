//
//  RequestManager.swift
//  GameOfSwift
//
//  Created by Jean-Charles Moussé on 20/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import Alamofire

typealias OnSuccess<T> = (_ response: T) -> Void
typealias OnFail = (_ error: Error?) -> Void

class RequestManager {
    private static func parseData<T: Decodable>(_ response: DataResponse<Data>, _ type: T.Type, _ onFail: @escaping OnFail) -> T? {
        do {
            if let _data = response.data, response.error == nil {
                return try JSONDecoder().decode(type, from: _data)
            }
            onFail(response.error)
        } catch let err {
            onFail(err)
        }
        return nil
    }
    
    static func getHouses(onSuccess: @escaping OnSuccess<[House]>, onFail: @escaping OnFail) {
        Alamofire.request("https://api.got.show/api/book/houses").responseData { response in
            if let _houses = parseData(response, [House].self, onFail) {
                onSuccess(_houses)
            }
        }
    }
    
    static func getHouseCharacters(houseName: String, onSuccess: @escaping OnSuccess<[HouseCharacter]>, onFail: @escaping OnFail) {
        Alamofire.request(
            "https://api.got.show/api/show/characters/byHouse/\(houseName.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")"
        ).responseData { response in
            if let _houses = parseData(response, [HouseCharacter].self, onFail) {
                onSuccess(_houses)
            }
        }
    }
}

