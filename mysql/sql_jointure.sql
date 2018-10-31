USE  videoclub;

# Afficher tous les films avec leur langue 
SELECT FILM.titre, LANGUE.langue FROM FILM INNER JOIN LANGUE ON FILM.langue = LANGUE.id;

# Sélectionner tous les films français
SELECT FILM.titre, LANGUE.langue FROM FILM INNER JOIN LANGUE ON FILM.langue = LANGUE.id WHERE LANGUE.langue = "Français";

# utiliser un alias (ex : FROM film AS f)
SELECT F.titre, L.langue FROM FILM AS F INNER JOIN LANGUE AS L ON F.langue = L.id WHERE L.langue = "Français";

# utiliser un alias sans le AS
SELECT F.titre, L.langue FROM FILM F INNER JOIN LANGUE L ON F.langue = L.id WHERE L.langue = "Français";

# Utiliser le nom de la langue dans la clause where au lieu de l'id
SELECT F.titre, L.langue FROM FILM F INNER JOIN LANGUE L ON F.langue = L.id WHERE L.langue = "Français";

# Sélectionner tous les films de science fiction triés par titre dans l'ordre alphabétique inverse
SELECT * FROM FILM F
	INNER JOIN FILM_GENRE FG ON F.id = FG.fk_film
	INNER JOIN GENRE G ON FG.fk_genre = G.id
    WHERE G.genre = 'Science-Fiction';