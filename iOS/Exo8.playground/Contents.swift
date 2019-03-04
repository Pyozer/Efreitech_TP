import Foundation

extension Date {
    static func from(_ year: Int, _ month: Int, _ day: Int, _ hour: Int, _ minute: Int) -> Date? {
        let calendar = Calendar(identifier: .gregorian)
        var dateComponents = DateComponents()
        dateComponents.year = year
        dateComponents.month = month
        dateComponents.day = day
        dateComponents.hour = hour
        dateComponents.minute = minute
        return calendar.date(from: dateComponents)
    }
    
    func toTimeString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        return formatter.string(from: self)
    }
    
    func addMinutes(_ minutes: Int) -> Date? {
        return Calendar.current.date(byAdding: .minute, value: minutes, to: self)
    }
}



enum TrainType {
    case TGV
    case Intercity
    case TER
    case Unknown
}

enum StationName : String {
    case Paris_Montparnasse = "Paris Montparnasse"
    case Le_Mans = "Le Mans"
    
    func string() -> String {
        return self.rawValue
    }
}

class Train {
    var idNumber: Int
    var type: TrainType
    var from: StationName
    var destination: StationName
    var departure: Date
    var arrival: Date
    
    init(idNumber: Int, type: TrainType, from: StationName, destination: StationName, departure: Date, duration: Int) {
        self.idNumber = idNumber
        self.type = type
        self.from = from
        self.destination = destination
        self.departure = departure
        self.arrival = departure.addMinutes(duration)!
    }
}

class Station {
    var name: StationName
    var trains: [Train] = []
    
    init(name: StationName) {
        self.name = name
        print("Welcome to \(name.string()) station.")
    }
    
    func addTrain(train: Train) {
        trains.append(train)
        Station.speakArrival(train)
    }
    
    func removeTrain(idNumber: Int) {
        if let trainFound = trains.first(where: { $0.idNumber == idNumber }) {
            trains.removeAll { $0.idNumber != idNumber }
            Station.speakDeparture(trainFound)
        } else {
            print("We are unable ton find the train number \(idNumber).")
        }
    }
    
    static func speakArrival(_ train: Train) {
        print("Brace yourself, the train \(train.type) number \(train.idNumber) to \(train.destination.string()) at \(train.departure.toTimeString()) is entering the station. Please clear the edge of the platform !")
    }
    
    static func speakDeparture(_ train: Train) {
        print("Ladies and Gentleman, the train \(train.type) number \(train.idNumber) to \(train.destination.string()) is leaving, please mind the doors closing. Estimated arrival at \(train.arrival.toTimeString()).")
    }
}


let stationParis = Station(name: .Paris_Montparnasse)
let stationLeMans = Station(name: .Le_Mans)

let trainParisLeMans = Train(
    idNumber: 8935,
    type: .TGV,
    from: .Paris_Montparnasse,
    destination: .Le_Mans,
    departure: Date.from(2019, 2, 12, 16, 14)!,
    duration: 60
)

let trainLeMansParis = Train(
    idNumber: 17456,
    type: .TER,
    from: .Le_Mans,
    destination: .Paris_Montparnasse,
    departure: Date.from(2019, 2, 13, 20, 22)!,
    duration: 140
)

stationParis.addTrain(train: trainParisLeMans)
stationParis.removeTrain(idNumber: 8935)

stationLeMans.addTrain(train: trainLeMansParis)
stationLeMans.removeTrain(idNumber: 17456)
