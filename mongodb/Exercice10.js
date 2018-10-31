// Aggrégation

// Importer dans une base le fichier website.json
mongoimport --db web --collection website --file ~/Downloads/website.json 

use web

// transform all traffic and likes to integer
var ops = [];
var cursor = db.website.find();
cursor.forEach(function (web) {     
    ops.push({ 
        "updateOne": { 
            "filter": { "_id": web._id } ,              
            "update": {
                "$set": {
                    "traffic": parseInt(web.traffic),
                    "likes": parseInt(web.likes)
                }
            } 
        }         
    });

    if (ops.length === 1000) {
        db.website.bulkWrite(ops);
        ops = [];
    }     
});
if (ops.length > 0) db.website.bulkWrite(ops);

// Quel est l'hébergeur qui héberge le plus de sites ?
db.website.aggregate([
    {
        $group: {
        _id:"$hebergeur",
        count: { $sum: 1 }
        },
    },
    { $sort : { count : -1 }},
    { $limit: 1 }
])

// Pour l'hébergeur Gandi, quel site a le plus de traffic
db.website.find({hebergeur: "Gandi"}).sort({traffic: -1}).limit(1)
db.website.aggregate([
    { $match: { hebergeur: 'Gandi' }},
    { $sort: {traffic: -1}},
    { $limit:1 }
])

// Quel est le traffic cumulé des hébergeurs ? Qui est le premier ?
db.website.aggregate([
    {
        $group: {
            _id:"$hebergeur",
            total: { $sum: "$traffic" } 
        },
    },
    { $sort : { total : -1 }},
])
db.website.aggregate([
    {
        $group: {
            _id:"$hebergeur",
            total: { $sum: "$traffic" } 
        },
    },
    { $sort : { total : -1 }},
    { $limit : 1 },
])

// Ou version plus longue et plus lisible

// Traffic cumulé de tous les hébergeurs
db.website.aggregate([
    {
        $group: {
            _id: '',
            traffic_total: { $sum: "$traffic" } 
        }
    }, {
        $project: {
            _id: 0,
            traffic_total: '$traffic_total'
        }
    }
])

// Traffic cumulé de chaque hébergeur
db.website.aggregate([
    {
        $group: {
            _id: {
                hebergeur: "$hebergeur"
            },
            traffic_total: { $sum: "$traffic" } 
        }
    }
])

// Quelle est la moyenne des likes par hébergeur ?
// les likes sont aussi en string, on les passe en int ==> Déjà fait avant
// On peut maintenant calculer la moyenne
db.website.aggregate([
    {
        $group: {
            _id: { hebergeur: "$hebergeur" },
            likes_avg: { $avg: "$likes" } 
        }
    }
])

// Augmenter le nombre de 50 likes les sites de Gandi 
db.website.update(
    { hebergeur: "Gandi" },
    { $inc: { likes: 50 }},
    { multi: true, upset: false }
)

// exporter dans un fichier newwebsite.json le contenu de notre collection
mongoexport --db web --collection website --out website.json