// Dans la collection "piscines" de la base "paris", trouver en utilisant les opérateurs de requête
use paris

// les piscines qui sont dans le 13e arrondissement
db.piscine.find({zipCode: 75013 })

// est équivalent à :


// les piscines qui ne sont pas le 13e arrondissement
db.piscine.find({zipCode: { $ne: 75013 }})
// En affichant uniquement le nom
db.piscine.find({zipCode: { $eq: 75013 }}, {name: 1, _id: 0})

// les piscines qui sont dans le 13e et celles qui sont dans le 14e arrondissement

// Soit avec un $or
db.piscine.find({
    $or: [{zipCode: 75013}, {zipCode: 75014}]
})

// Équivalent à

// Soit avec un $in
db.piscine.find({zipCode: { $in: [75013, 75014] }})

// les piscines qui ne sont pas dans le 15, 16, 17 et 18e arrondissement
db.piscine.find({zipCode: { $nin: [75015, 75016, 75017, 75018] }})

// En triant par code postal descendant:
db.piscine.find().sort({zipCode: -1})
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