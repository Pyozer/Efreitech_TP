USE videoclub ;

# Tous les films
SELECT * FROM FILM ;

# Le titre, date de sortie de tous les films
SELECT titre, date_sortie FROM FILM ;

# Nom et prénom des acteurs (trié par leur nom)
SELECT nom, prenom FROM ACTEUR ORDER BY nom ASC ;

# Tous les réalisateurs
SELECT * FROM REALISATEUR ORDER BY id DESC ;

# LKe nom et date de naissance de tous les réalisateurs
SELECT nom, date_naissance FROM REALISATEUR ;

# Tous les films sorties après 2000
SELECT * FROM FILM WHERE year(date_sortie) >  2000 ;

# Le nombre de films sorties après 2000
SELECT COUNT(id) FROM FILM WHERE year(date_sortie) >  2000 ;

# Le dernier film sorti
SELECT * FROM FILM ORDER BY date_sortie DESC LIMIT 1 ;
SELECT * FROM FILM WHERE date_sortie = (SELECT MAX(date_sortie) FROM FILM) ;