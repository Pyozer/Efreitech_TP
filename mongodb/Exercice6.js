// Revenez sur la base "videoclub"
use videoclub

// Insérez des enregistrements de films
/*
titre : La vache et le prisonnier
acteurs : Fernandel, René Havard
realisateur : Henri Verneuil
duree : 120
*/

/*
titre: Zombieland
acteur: Jesse Eisenberg
realisateur : Ruben Fleischer
duree: 88
synopsis : "A shy student trying to reach his family in Ohio, a gun-toting tough guy trying to find the last Twinkie, and a pair of sisters trying to get to an amusement park join forces to travel across a zombie-filled America."
*/
db.films.insert([
    {
        titre: "La vache et le prisonnier",
        acteurs: [
            { nom: "Havard", prenom: "René" },
            { prenom: "Fernandel" }
        ],
        realisateurs: [{ nom: "Verneuil", prenom: "Henri" }],
        duree: 120
    }, {
        titre: "Zombieland",
        acteurs: [{ nom: "Eisenberg", prenom: "Jesse" }],
        realisateurs: [{ nom: "Fleischer", prenom: "Ruben" }],
        duree: 88,
        synopsis : "A shy student trying to reach his family in Ohio, a gun-toting tough guy trying to find the last Twinkie, and a pair of sisters trying to get to an amusement park join forces to travel across a zombie-filled America."
    }
])

// Trouver un film dont le nom contient 'vache' (en utilisant une expression régulière)
db.films.find({
    titre: {
        $regex: /.*vache.*/
    }
})
// équivalent
db.films.find({
    titre: /.*vache.*/
})
// aussi équivalent
db.films.find({
    titre: /vache/
})

// Afficher uniquement le prenom des acteurs de ce film
db.films.find({
    titre: /vache/
}, {
    "acteurs.prenom": 1
})

// Trouver les films dont un acteur s'appelle René
db.films.find({
    "acteurs.prenom": "René"
})
