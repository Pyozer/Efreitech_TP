class Address {
    var streetName: String
    var streetNumber: Int
    var buildingName: String?
    var entranceNumber: Int?
    var floorNumber: Int?
    
    init(streetName: String, streetNumber: Int) {
        self.streetName = streetName
        self.streetNumber = streetNumber
    }
    
    func buildAddress() -> String {
        var address = "\(streetNumber) \(streetName)"
        
        if let _buildingName = buildingName {
            address += ", \(_buildingName)"
        }
        if let _floorNumber = floorNumber {
            address += ", Floor \(_floorNumber)"
        }
        if let _entranceNumber = entranceNumber {
            address += " Appartment \(_entranceNumber)"
        }
        return address
    }
}

let address = Address(streetName: "Boulevard Maxime Gorki", streetNumber: 179)
print(address.buildAddress())

address.floorNumber = 1
address.entranceNumber = 111
address.buildingName = "Résidence Louis Aragon"
print(address.buildAddress())
