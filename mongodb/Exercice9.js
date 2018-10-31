// Mise à jour -> update

// Dans la liste des restaurants
use newyork

// Modifier les restaurants dont la cuisine est Hamburgers pour leur ajouter un champ healthy_food égal à 2
db.restaurants.update(
    { cuisine: /Hamburgers/ }, 
    { $set: { healthy_food: 2 }},
    { multi: true, upset: false }
)

// Pour les végétariens, leur mettre le champ healthy food à 9.
db.restaurants.update(
    { cuisine: /Vegetarian/ }, 
    { $set: { healthy_food: 9 }},
    { multi: true, upset: false }
)

// Vérifier que tous les restaurants ont un tableau grades
db.restaurants.update(
    { grades: { $exists: false }},
    { $set: { grades: [] }},
    { multi: true, upset: false }
)

// Supprimer le champ building des restaurants situés dans le Bronx et ajouter un booléen
// #### Quel boolean ? #### //
db.restaurants.update(
    { borough: "Bronx"},
    { $unset: { "address.building": null }, $set: { "testBool": true }},
    { multi: true, upset: false }
)

//Vérifier

// Ajouter un champ rating à 5 à tous les restaurants
db.restaurants.update(
    {},
    { $set: { rating: 5.0 }},
    { multi: true, upset: false }
)

// Multiplier le champ rating par 2 pour les restaurants situés dans le Queens
db.restaurants.update(
    { borough: "Queens" },
    { $mul: { rating: 2 }},
    { multi: true, upset: false }
)

// Trouver les restaurants de Brooklyn
db.restaurants.find({
    borough: "Brooklyn"
})

// Limiter les résultats à 100
db.restaurants.find({
    borough: "Brooklyn"
}).limit(100)

// Appliquer d'abord un count()
db.restaurants.find({
    borough: "Brooklyn"
}).count()

// Puis à la place appliquer un size()
db.restaurants.find({
    borough: "Brooklyn"
}).size()

// Quelle est la différence ?
// REPONSE: On obtient 6086 pour les deux, size utilisé pour compté le nombre d'élément d'un Array ?

// Ajouter une entrée au tableau grades pour le restaurant "Tu-Lu'S Gluten-Free Bakery"
db.restaurants.update(
    { name: "Tu-Lu'S Gluten-Free Bakery" },
    {
        $push: {
            grades: {
                date: ISODate(),
                grade: "A",
                score: 5
            }
        }
    }
)

// Modifier le champ rating pour tous les documents pour qu'il soit égal à la moyenne réelle des grades
// Créer un curseur et le manipuler avec un forEach
var restaurants = db.restaurants.find()
restaurants.forEach(function(restaurant) {
    var sumRating = 0;
    restaurant.grades.forEach(function(grade){
        sumRating += grade.score;
    });
    restaurant.rating = sumRating / restaurant.grades.length;
    db.restaurants.save(restaurant);
})

// Quel est le restaurant qui a la meilleure moyenne
db.restaurants.find().sort({rating: -1}).limit(1)