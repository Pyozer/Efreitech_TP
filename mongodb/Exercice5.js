use paris

// Retrouver les 5 premières piscines par ordre alphabétique ( et dont le champ zipCode existe)
db.piscine.find({zipCode: {$exists: true}}).sort({name: 1}).limit(5)

// Ajoutez 2 piscines avec un champ nom au lieu de name
db.piscine.insert([
    {
        id: 9998,
        nom: "Piscine Alfred Nakache",
        address: "4-12, rue Dénoyez ",
        zipCode: 75020,
        lat: 48.871498,
        lon: 2.378612
    },
    {
        id: 9999,
        nom: "Piscine Bernard Lafay",
        address: "79, rue de la Jonquière ",
        zipCode: 75017,
        lat: 48.894707,
        lon: 2.318883
    }
])

// Si je compte mes piscines, j'en ai donc 33
db.piscine.find().count()

// Compter uniquement les piscines dont le champ name est présent
db.piscine.find({name: { $exists: true}}).count()

// équivalent à
db.piscine.find({name: { $ne: null}}).count()

// Renvoie toutes les piscines ayant effectivement le champ name
db.piscine.find({name: { $exists: true}})

// Limite à 5 résultats
db.piscine.find({name: { $exists: true}}).limit(5)

// En les triant par ordre alphabétique (case sensitive)
db.piscine.find({name: { $exists: true}}).sort({name: 1})

// En plus en limitant les champs retournés au nom
db.piscine.find({name: { $exists: true}}, {name: 1}).sort({name: 1}) // Avec l'_ID
db.piscine.find({name: { $exists: true}}, {name: 1, _id: 0}).sort({name: 1}) // Uniquement le nom

