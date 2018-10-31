USE videoclub ;

## Vide les tables
SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE FILM_ACTEUR;
TRUNCATE TABLE FILM_REALISATEUR;
TRUNCATE TABLE FILM_GENRE;
TRUNCATE TABLE REALISATEUR;
TRUNCATE TABLE ACTEUR;
TRUNCATE TABLE FILM;
TRUNCATE TABLE GENRE;

SET FOREIGN_KEY_CHECKS=1;

## Ajout Film
INSERT INTO FILM(titre, date_sortie) VALUES('Pulp-Fiction', '1994-10-26') ;

## Ajout realisateurs
INSERT INTO REALISATEUR(nom, prenom, date_naissance, description) VALUES('Quentin', 'Torantino', '1953-03-27', 'Grand réalisateur') ;
INSERT INTO REALISATEUR(nom, prenom, date_naissance, description) VALUES('Jean-Luc', 'Godard', NULL, 'Réalisateur Français') ;

## Ajout genres
INSERT INTO GENRE(genre) VALUES('Humour'), ('Tragédie'), ('Policier'), ('Historique'), ('Romance'), ('Amour') , ('Drame'), ('Thriller');

## Ajout acteur
INSERT INTO ACTEUR(nom, prenom, date_naissance) VALUES('John', 'Travolta', '1954-02-18') ;
INSERT INTO ACTEUR(nom, prenom, date_naissance, description) VALUES('Samuel', 'Lee Jackson', '1948-12-21', 'Samuel Leroy Jackson entre au Morehouse College d\'Atlanta pour entreprendre des études d\'architectures, mais ...') ;

## Aossicie acteurs, realisateurs et genre au film Pulp-Fiction
INSERT INTO FILM_ACTEUR VALUES(1, 1), (1, 2) ;
INSERT INTO FILM_REALISATEUR VALUES(1, 1) ;
INSERT INTO FILM_GENRE VALUES(1, 1), (1, 3), (1, 7), (1, 8)  ;