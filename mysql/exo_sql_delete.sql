USE videoclub;

# Supprime le(s) client qui a/ont loué(s) Pulp-Fiction
DELETE CLIENT FROM CLIENT
	INNER JOIN LOCATION AS LOC ON LOC.fk_client = CLIENT.id 
	INNER JOIN EXEMPLAIRE AS EX ON EX.id = LOC.fk_exemplaire
	INNER JOIN FILM ON FILM.id = EX.fk_film
	WHERE titre = 'Pulp-Fiction' ;

###  Réponse: Fonctionne pas car il y a des clé étrangères qui sont en lien avec ce client,  il faut d'abord supprimer sa location avant de supprimer le client

# Supprimer la location du client et de pulpfiction
## Suppression des locations du film Pulp-Fiction
DELETE LOC FROM LOCATION AS LOC
	INNER JOIN EXEMPLAIRE as EX ON EX.id = LOC.fk_exemplaire
	INNER JOIN FILM ON FILM.id = EX.fk_film
	WHERE FILM.titre = 'Pulp-Fiction' ;
    
## Suppression du film pulp-fiction
DELETE FROM FILM WHERE titre = 'Pulp-Fiction' ;

## Supprimer le genre Romantique
DELETE FILM_GENRE FROM FILM_GENRE INNER JOIN GENRE WHERE genre = "Romantique" ;
DELETE FROM GENRE WHERE genre = "Romantique" ;
