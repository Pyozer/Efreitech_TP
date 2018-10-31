// Suppression de documents

// db.collection.remove(query, options)


// Importer le fichier seas.json dans la db world
mongoimport --db world --collection seas --file ~/Downloads/seas.json
use world

// Suppression de tous les enregistrements
db.seas.remove({})

// Réimporter !! ;-)

// Supprimer l'océan Atlantique
db.seas.remove({
    name: "Atlantic Ocean"
})

// Supprimer les mers bordant l'océan atlantique
db.seas.remove({
    bordering: /sea-Atlantic/
})

// Quelle est la mer la plus profonde ?
db.seas.find().sort({depth: -1}).limit(1)

// Ajouter la mer 'Océan Atlantique'
db.seas.insert({
    secureName: "sea-Pacific",
    country: "R J RP RC GCA MEX CDN USA CR NIC PA ES HCA CO AUS FJI KIR MH FSM NAU NZ PAL SLB TO TOK TUV VU WS RCH PE EC RI PNG NCA NIUE NMIS PITC WAFU AMSA COOK FPOL GUAM NORF",
    bordering: "sea-BeringSea sea-OchotskSea sea-Japanisches_Meer sea-EastChinaSea sea-SouthChinaSea sea-Sulusee sea-Celebessee sea-Bandasee sea-Indic",
    name: "Pacific Ocean",
    depth: 11034
})

// Ajouter un tableau à toutes les mers
db.seas.update(
    {
        name: {
            $not: /Ocean/i
        }
    }, 
    { $set: { tab: [] }},
    { multi: true, upset: false }
)

// Quelle est la profondeur cumulé de toutes les mers ?
db.seas.aggregate([
    {
        $match: {
            name: {
                $not: /Ocean/i
            }
        }
    },
    {
        $group: {
            _id: null,
            total_depth: {
                $sum: "$depth"
            }
        }
    },
    { $project: { _id: 0, total_depth: 1 }}
])
