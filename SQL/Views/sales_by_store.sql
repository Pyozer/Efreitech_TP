USE sakila;

DROP VIEW IF EXISTS sales_by_store;

CREATE VIEW `sales_by_store` AS
	SELECT SUM(payment.amount) as total_sales, city.city, country.country, staff.first_name, staff.last_name FROM store
		LEFT JOIN address ON address.address_id = store.address_id
        LEFT JOIN city ON city.city_id = address.city_id
        LEFT JOIN country ON country.country_id = city.country_id
        LEFT JOIN staff ON staff.staff_id = store.manager_staff_id
        LEFT JOIN payment ON payment.staff_id = staff.staff_id
        GROUP BY store.store_id;