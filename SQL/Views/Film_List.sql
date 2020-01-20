USE sakila;

DROP VIEW IF EXISTS film_list;

CREATE VIEW `film_list` AS
	SELECT film.*, category.name as category, GROUP_CONCAT(CONCAT(actor.first_name, ' ', actor.last_name) SEPARATOR ', ') as actors FROM film
		LEFT JOIN film_category ON film.film_id = film_category.film_id
        LEFT JOIN category ON film_category.category_id = category.category_id
        LEFT JOIN film_actor ON film_actor.film_id = film.film_id
        LEFT JOIN actor ON actor.actor_id = film_actor.actor_id
        GROUP BY film.film_id, category.name;