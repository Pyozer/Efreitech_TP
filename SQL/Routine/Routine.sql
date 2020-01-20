DROP PROCEDURE IF EXISTS film_in_stock;

DELIMITER $$

CREATE PROCEDURE film_in_stock (
	IN p_film_id INT,
    IN p_store_id INT,
    OUT p_film_count INT
)
BEGIN
	SELECT COUNT(*) INTO p_film_count FROM inventory WHERE inventory.film_id = p_film_id AND inventory.store_id = p_store_id;
END$$

DELIMITER ;
