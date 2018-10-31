USE videocub;

# Pulp fiction en ajoutant le synopsis : "L'odyssée sanglante et burlesque de petits malfrats dans la jungle de Hollywood à travers trois histoires qui s'entremêlent. "
UPDATE FILM SET synopsis = 'L\'odyssée sanglante et burlesque de petits malfrats dans la jungle de Hollywood à travers trois histoires qui s\'entremêlent.' WHERE titre = 'Pulp-Fiction' ;

#Jean-Luc Godard en mettant sa date de naissance
UPDATE REALISATEUR SET date_naissance = '1930-12-03' WHERE nom = 'Godard' AND prenom = 'Jean-Luc' ;

# Samuel Lee Jackson en supprimant sa date de naissance et en ajoutant sa pointure 42
UPDATE ACTEUR SET date_naissance = NULL AND description = 'Pointure 42' WHERE nom = 'Lee Jackson' AND prenom = 'Samuel';

# Créer : un exemplaire de pulp fiction, une location entre un client et cet exemplaire en mettant la date d'emprunt
INSERT INTO EXEMPLAIRE(ref, support, fk_film) VALUES (1, 'DVD', (SELECT id FROM FILM WHERE titre = 'Pulp-Fiction')) ;
INSERT INTO LOCATION(fk_client, fk_exemplaire, date_location) VALUES(1, LAST_INSERT_ID(), NOW()) ;

# Mettez à jour la location en définissant la date de retour
## Met à jour la location du client 1 pour l'exemplaire 1
UPDATE LOCATION SET date_fin = '2018-11-03' WHERE fk_client = 1 AND fk_exemplaire = 1;