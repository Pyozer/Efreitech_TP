// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurants.json
mongoimport --db newyork --collection restaurants --file ~/Downloads/restaurants.json 

use newyork

// Combien y a-t-il de restaurants ?
db.restaurants.find().count()
// Identique à
db.restaurants.count()

// Trouver les restaurants qui sont dans la rue "Morris Park Ave"
db.restaurants.find({
  "address.street": "Morris Park Ave" 
})
// Combien y en-a-t-il ?
db.restaurants.find({
  "address.street": "Morris Park Ave" 
}).count()

// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"
db.restaurants.find({
  "address.street": {
    $in: ["Morris Park Ave", "Morris Park Avenue"]
  }
})

// Afficher uniquement (sans l'_id) les champs quartier, type de cuisine et adresse
db.restaurants.find({}, {
  _id: 0, borought: 1, cuisine: 1, address: 1
})

// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie.
// Avec un $or
db.restaurants.find({
  borough: "Staten Island",
  $or: [
    {
      cuisine: /Hamburgers/
    },
    {
      cuisine: /Bakery/
    }
  ]
})


// Avec un $in
db.restaurants.find({
  borough: "Staten Island",
  cuisine: {
    $in: [/Hamburgers/, /Bakery/]
  }
})

// Quel est le type de restaurant le plus présent ?
db.restaurants.aggregate([
  {
    $group: {
      _id:"$cuisine",
      count: { $sum: 1 }
    },
  },
  {
    $sort : { count : -1 }
  },
  {
    $limit: 1
  }
])

// https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/

// La varibale restaurants est un objet. Dans MongoDB son contenu s'appelle un curseur...
var restaurants = db.restaurants.find()

// Parcours d'un curseur avec un while
while (restaurants.hasNext()) {
  print(tojson(restaurants.next()));
  // équivalent à printjson(restaurants.next())
}

// Parcours d'un curseur avec un foreach
var restaurants = db.restaurants.find()
restaurants.forEach(function(restaurant) {
  printjson(restaurant);
})

// La méthode aggregate de mongoDB fait la même chose de manière plus puissante
// db.collection.aggregate(query, options)

// https://docs.mongodb.com/manual/aggregation/


// Faire la même requête pour le quatier du Bronx
db.restaurants.aggregate([
  {
    $match: {
      borough: "Bronx" 
    }
  }
])

// En limitant le nombre de retours à 5
db.restaurants.aggregate([
  {
    $match: {
      borough: "Bronx" 
    }
  },
  {
    $limit: 5
  }
])