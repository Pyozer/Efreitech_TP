// Importer dans une base us, dans la collection companies le fichier companies.json
mongoimport --db us --collection companies --file companies.json

use us

// Quelle est la société la plus ancienne ?
db.companies.find({
    founded_year: {
        $ne: null
    }
}).sort({founded_year: 1}).limit(1)

// Quelle est la société qui emploie le plus de personnes ?
db.companies.find({
    number_of_employees: {
        $ne: null
    }
}).sort({number_of_employees: -1}).limit(1)

// Quelle est la société qui emploie le plus de personnes dans la publicité ?
//  ## Pas trouvé la donnée à utiliser

// Quel est l'effectif cumulé des entreprises de 'network_hosting' ?
db.companies.aggregate([
    {
        $group: {
            _id: { category_code: "network_hosting" },
            count: {
                $sum: { $size: "$relationships" }
            }
        }
    }
])

// Quelle entreprise est dirigé par Rich Langdale ?
db.companies.find({
    "relationships.person.first_name": "Rich",
    "relationships.person.last_name": "Langdale",
    "relationships.title": /Founder/
})

// Supprimer les entreprises de finance
db.companies.remove({ category_code: "finance" })

// Mettre à jour les entreprises de publicité en leur ajoutant un champ 'likes'
db.companies.update(
    { category_code: "advertising" },
    {
        $set: {
            likes: 0
        }
    },
    { multi: true }
)

// Créer un index sur le champ nom de la compagnie
db.companies.createIndex({ "name": 1 })

// Supprimer cet index
db.companies.dropIndex({ "name": 1 })

// Recréer l'index en spécifiant que la valeur doit être unique
db.companies.createIndex({ "name": 1 }, { unique: true })
// ### Problème il y a des entreprises en double , suppression des doublons
db.companies.aggregate([
    { "$group": {
        "_id": { "name": "$name" },
        "dups": { "$push": "$_id" },
        "count": { "$sum": 1 }
    }},
    { "$match": { "count": { "$gt": 1 } }}
]).forEach(function(doc) {
    doc.dups.shift();
    db.companies.remove({ "_id": {"$in": doc.dups }});
});

// Insérer une société My Little Compagnie en respectant l'organisation actuelle de la base
db.companies.insert({
    name: "My Little Compagnie",
    permalink: "my-little-compagnie",
    crunchbase_url: "http://www.mylittlecompagnie.com/company",
    homepage_url: "http://www.mylittlecompagnie.com",
    blog_url: "",
    blog_feed_url: "",
    twitter_username: "my_little_compagnie",
    category_code: "enterprise",
    number_of_employees: 20,
    founded_year: 2018,
    deadpooled_year: 2,
    tag_list: "",
    alias_list: "",
    email_address: "noreply@mylittlecompagnie.com",
    phone_number: "925-924-9500",
    description: "My little compagnie, the place to be",
    created_at: "Fri Oct 12 11:00:00 UTC 2018",
    updated_at: "Fri Oct 12 11:00:00 UTC 2018",
    overview: "",
    image: null,
    products: [],
    relationships: [],
    competitions: [],
    providerships: [],
    total_money_raised: "$0",
    funding_rounds: [],
    investments: [],
    acquisition: null,
    acquisitions: [],
    offices: [],
    milestones: [],
    video_embeds: [],
    screenshots: [],
    external_links: [],
    partners: []
})

// Trouver les sociétés qui ont un bureau situé à moins de 20 kilomètres de la statue de la Liberté
db.companies.find().forEach(function(company) { 
    company.offices.forEach(function(office) {
        if (office.longitude == null)
            office.longitude = 0;
        if (office.latitude == null)
            office.latitude = 0;

        var coordinates = {
            "type": "Point",
            "coordinates": [office.longitude, office.latitude]
        };
        office.position = coordinates;
    });
    db.companies.save(company);
});

db.companies.createIndex({"offices.position": "2dsphere"});
db.companies.find({
    "offices.position": {
        $near: {
            $geometry: {
               type: "Point" ,
               coordinates: [-74.044558, 40.689207 ]
            },
            $maxDistance: 20000
        }
    }
})

// Ajouter un champ phone dans l'adresse du premier bureau des sociétés qui sont situées dans l'état de NY
db.companies.find().forEach(function(company) {
    if (company.offices.length > 0 && company.offices[0].state_code == 'NY') {
        company.offices.forEach(function(office) {
            office.phone = ""
        });
    }
    db.companies.save(company);
});

// Créer une autre collection 'awards', créer quelques récompenses en les reliant à une société en utilisant une référence
db.createCollection("awards");
db.awards.insert([
    {
        likes: 0,
        company_id: ObjectId('52cdef7c4bab8bd675297d8b')
    },{
        likes: 0,
        company_id: ObjectId('52cdef7c4bab8bd675297d90')
    },{
        likes: 0,
        company_id: ObjectId('52cdef7c4bab8bd675297d93')
    }
])

// Créer une fonction qui prend en paramètre un _id et qui calcule la moyenne des likes d'une entreprise


// Ajouter quelques likes dans un tableau et tester votre fonction

