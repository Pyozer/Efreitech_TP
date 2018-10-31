// Vélib

// Récupérer un fichier json des velib chez jcdecaux developer
// Importer dans la base paris, le fichier jcdecaux.json dans une collection velib
mongoimport --db paris --collection velib --file ~/Downloads/jcdecaux_velib_paris.json --jsonArray

use paris

// Problème ! On n'a pas de champ codepostal ... On retrouve le code postal dans l'adresse.

// Mettez à jour tous les enregistrements en leur ajoutant un champ zipCode
db.velib.find().forEach(function(velib) {
    var address = velib.address;
    var indexZipCode = address.search(/[0-9]{5}/);
    velib.zipCode = parseInt(address.substring(indexZipCode, indexZipCode + 5));
    db.velib.save(velib);
})

// Quel est l'arrondissement de Paris ou il y a le plus de stations ? (avec un $in)
// OU plus élégant (avec aggregate)
db.velib.aggregate([
    {
        $match: {
            zipCode: { $gte: 75000 },
            zipCode: { $lt: 75021 }
        }
    },
    {
        $group: {
            _id: "$zipCode",
            stations: { $sum: 1 }
        }
    },
    { $sort: { stations: -1 }},
    { $limit: 1 }
])

// Nombre de station par arrondissement
db.velib.aggregate([
    {
        $group: {
            _id: "$zipCode",
            stations: { $sum: 1 }
        }
    },
])

// Quelle est la ville (hors Paris) qui a le plus de stations
// OU plus élégant (avec aggregate)
db.velib.aggregate([
    {
        $match: {
            zipCode: { $lt: 75000 },
            zipCode: { $gt: 75020 }
        }
    },
    {
        $group: {
            _id: "$zipCode",
            stations: { $sum: 1 }
        }
    },
    { $sort: { stations: -1 }},
    { $limit: 1 }
])

// Cherchez la piscine Dunois.

// Quelles sont les 5 stations velib les plus proches de la piscine Dunois ?
// Première version : en utilisant une fonction de calcul de distance
var posDunois = { lat: 48.832973, lon: 2.366437 };
var listVelibDist = [];
db.velib.find().forEach(function(velib) {
    var dlon = velib.longitude - posDunois.lon;
    var dlat = velib.latitude - posDunois.lat;

    var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(posDunois.lat) * Math.cos(velib.latitude) * Math.pow(Math.sin(dlon / 2), 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = 6367 * c;

    listVelibDist.push({
        id: velib.number,
        distance: distance,
    });
});
listVelibDist.sort(function(a, b) {
    return (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0);
});

listVelibDist.slice(0, 5).forEach(function(elem) {
    print(db.velib.find({ number: elem.id}).pretty());
})

// Seconde version : en modifiant la structure de la collection et en utilisant l'opérateur géographique $near
db.velib.find().forEach(function(velib) {
    var lat = velib.latitude;
    var lon = velib.longitude;

    var coordinates = {
            "type": "Point",
            "coordinates": [lat, lon]
        }
    velib.coordinates = coordinates;

    db.velib.save(velib);
})
db.velib.createIndex({coordinates: "2dsphere"});

db.velib.find({
    coordinates: {
        $near: {
            $geometry: {
               type: "Point" ,
               coordinates: [ 48.832973, 2.366437 ]
            }
        }
    }
})


