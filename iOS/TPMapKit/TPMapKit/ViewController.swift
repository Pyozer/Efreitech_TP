//
//  ViewController.swift
//  TPMapKit
//
//  Created by Jean-Charles Moussé on 21/05/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit
import MapKit

enum Contient {
    case Europe
    case Afrique
    case Asie
    case Oceanie
    case AmeriqueNord
    case AmeriqueSud
}

class ViewController: UIViewController {

    @IBOutlet weak var mapView: MKMapView!
    @IBOutlet weak var segmentControl: UISegmentedControl!
    
    let locationManager = CLLocationManager()
    
    let cities: [String : CLLocationCoordinate2D] = [
        "Paris": CLLocationCoordinate2D(latitude: 48.8566101, longitude: 2.3514992),
        "Abidjan": CLLocationCoordinate2D(latitude: 5.4091179, longitude:  -4.0422099),
        "Beijing": CLLocationCoordinate2D(latitude: 39.906217, longitude: 116.3912757),
        "Auckland": CLLocationCoordinate2D(latitude: -36.8534665, longitude: 174.7655514),
        "San Francisco": CLLocationCoordinate2D(latitude: 37.7792808, longitude: -122.4192363),
        "Santiago de Chile": CLLocationCoordinate2D(latitude: -33.4377968, longitude: -70.6504451)
    ]
    
    let continents: [Contient : MKCoordinateRegion] = [
        .Europe: MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 59.740477037655893, longitude: 8.7182208228062912),
            span: MKCoordinateSpan(latitudeDelta: 61.129705032630937, longitudeDelta: 66.277389659283983)
        ),
        .Afrique: MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 4.0930632060384369, longitude: 17.2452865698449),
            span: MKCoordinateSpan(latitudeDelta: 103.16662788379688, longitudeDelta: 70.16335013280036)
        ),
        .Asie: MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 52.483338856198657, longitude: 86.670899169882404),
            span: MKCoordinateSpan(latitudeDelta: 128.61736720857235, longitudeDelta: 128.95642223259998)
        ),
        .Oceanie: MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: -27.30182662309884, longitude: 147.60628049020244),
            span: MKCoordinateSpan(latitudeDelta: 99.25673407934724, longitudeDelta: 72.578752378506977)
        ),
        .AmeriqueNord: MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 50.061630649301605, longitude: -99.364201324679598),
            span: MKCoordinateSpan(latitudeDelta: 103.08917798021679, longitudeDelta: 94.728245405069629)
        ),
        .AmeriqueSud: MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: -21.262681558037769, longitude: -63.553019314016232),
            span: MKCoordinateSpan(latitudeDelta: 104.07053040189287, longitudeDelta: 74.617542267231954)
        )
    ]
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        initMarkers()
        changeRegion(continents[.Europe]!)
        checkLocationAuthorizationStatus()
    }
    
    @IBAction func onContientPressed(_ sender: Any) {
        if segmentControl.selectedSegmentIndex < 6 {
            let order: [Int : Contient] = [0: .Europe, 1: .Afrique, 2: .Asie, 3: .AmeriqueNord, 4: .AmeriqueSud, 5: .Oceanie]
            changeRegion(continents[order[segmentControl.selectedSegmentIndex]!]!)
        }
    }
    
    func checkLocationAuthorizationStatus() {
        if CLLocationManager.authorizationStatus() != .authorizedWhenInUse {
            locationManager.requestWhenInUseAuthorization()
        }
        mapView.showsUserLocation = true
    }
    
    func initMarkers() {
        mapView.removeAnnotations(mapView.annotations)
        
        for (city, position) in cities {
            let annotation = MKPointAnnotation()
            annotation.coordinate = position
            annotation.title = city
            mapView.addAnnotation(annotation)
        }
    }
    
    func changeRegion(_ region: MKCoordinateRegion) {
        mapView.setRegion(region, animated: true)
    }
}
