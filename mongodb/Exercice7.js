// Exercices de mises à jour

// db.collection.update(query, update, options)

// Reprendre la base paris
use paris

// On ajoute un champ 'acces_handicape' à true aux piscines du 13e
db.piscine.update(
    { zipCode: 75013 },
    { $set: { acces_handicape: true }}
)
// Par défaut update() ne modifie que le premier élément qui matche
// Il faut ajouter l'option multi:true pour que la mise à jour se fasse pour tous les enregistrements
db.piscine.update(
    { zipCode: 75013 },
    { $set: { acces_handicape: true }},
    { multi: true }
)
// L'option upsert : true ajoute un document si aucun document ne correspond ou modifie si un document correspond
db.piscine.update(
    { zipCode: 75013 },
    { $set: { acces_handicape: true }},
    { multi: true, upset: false }
)

// On peut définir des champs et en supprimer dans la meme requete
// Ajouter un champ verif true et supprimer l'accès handicapé
db.piscine.update(
    {},
    {
        $set: { verif: true },
        $unset: { acces_handicape: null }
    },
    { multi: true }
)
