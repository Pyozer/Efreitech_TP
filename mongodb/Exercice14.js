// Par défaut, mongo est accessible sans authentification
// Dans un environnement de production, il faut mettre en place cette sécurité !!

use admin
//On créé un  utilisateur et on lui donne un rôle ( = des droits )
db.createUser(
    {
      user: "username",
      pwd: "password",
      roles: [
         { role: "readWrite", db: "base_protegee" },
      ]
    }
)

// Il faut redémarrer le serveur mongod avec le paramètre --auth pour activer l'authentification
mongod --auth

// Reconnectez-vous au client mongo et essayez d'insérer un enregistrement
db.testCollection.insert({
  name: "Nom",
  prenom: "Prenom"
});

// On vous le refuse car vous n'avez pas les droits.
mongo mongodb://localhost:27017/base_protegee --username username --password password