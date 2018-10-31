// Dans la collection piscines de la base paris, trouver :
use paris

// les piscines dont le code postal est supérieur ou égal à 75013 triés par code postal descendant
db.piscine.find({zipCode: {$gte: 75013}}).sort({zipCode: -1})

// Les piscines situées à l'ouest de Notre Dame de Paris
db.piscine.find({lat: {$lt: 48.85234}}) // Utiliser les coordonées inférieur à X (notre dame paris)

// Et leur nombre
db.piscine.find({lat: {$lt: 48.85234}}).count()
// Les piscines dont zipCode=75013 ET id=2929 avec l'opérateur $and et $eq
db.piscine.find({ $and: [
    {
        zipCode: { $eq: 75013 }
    }, {
        id: { $eq: 2929 }
    }

]})

// On peut simplifier - uniquement l'opérateur $and

// Version la plus courte
db.piscine.find({zipCode: 75013, id: 2929})