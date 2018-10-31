USE world;

#Trouver la France et afficher tous ses champs
SELECT * FROM country WHERE Name = 'France' OR Code = 'FRA' ;

#Trouver la france et n'afficher que ces champs nom, continent, population, espérance de vie
SELECT Name, Continent, Population, LifeExpectancy FROM country  WHERE Name = 'France' OR Code = 'FRA' ;

#Insérer la ville de Toulon avec 168000 habitants (et les autres informations obligatoires s'il y en a )
INSERT INTO city(Name, CountryCode, District, Population)
	VALUES('Toulon', 'FRA', 'Provence-Alpes', 164532) ;

# Quel est le pays le plus vaste du monde ?
SELECT * FROM country ORDER BY population DESC LIMIT 1 ;

# Quel est le pays le moins peuplé ?
SELECT * FROM country ORDER BY population ASC LIMIT 1 ;

# Afficher les 10 pays les plus peuplés ?
SELECT * FROM country ORDER BY population DESC LIMIT 10 ;

# Quel continent compte le plus de pays ?
SELECT COUNT(Code) AS nbCountry, Continent FROM country GROUP BY Continent ORDER BY nbCountry DESC LIMIT 1;

# Mettre à jour la ville de Tarragona pour mettre sa population à 115000
UPDATE city SET Population = 115000 WHERE Name = 'Tarragona' ;

# Mettre à jour la ville de Tieli pour mettre sa population 0
UPDATE city SET Population = 0 WHERE Name = 'Tieli' ;

# Quelle est la population cumulée des villes de France ?
SELECT SUM(Population) FROM city WHERE CountryCode = 'FRA' ;

# Quel pays asiatique a la plus forte espérance de vie ?
SELECT Name FROM country WHERE Continent = 'Asia' ORDER BY LifeExpectancy DESC LIMIT 1 ;

# Supprimer la ville de Hsintien
DELETE FROM city WHERE Name = 'Hsintien' ;

# Avec une jointure, afficher la ville de Paris, Son pays, la population du pays, et la langue du pays
SELECT city.Name, country.Name, country.Population, countrylanguage.Language FROM city
	INNER JOIN country ON city.CountryCode = country.Code
    INNER JOIN countrylanguage ON countrylanguage.CountryCode = country.Code
    WHERE city.Name = 'Paris' AND countrylanguage.isOfficial = 'T' ;




