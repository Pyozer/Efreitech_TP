USE sakila;

DROP TRIGGER IF EXISTS ins_film;
DROP TRIGGER IF EXISTS upd_film;
DROP TRIGGER IF EXISTS del_film;

DELIMITER $$

CREATE TRIGGER `ins_film` AFTER INSERT ON `film` FOR EACH ROW BEGIN
  INSERT INTO film_text (film_id, title, description)
    VALUES (NEW.film_id, NEW.title, NEW.description);
END$$
  
CREATE TRIGGER `upd_film` AFTER UPDATE ON `film` FOR EACH ROW BEGIN
  IF (old.title != new.title) or (old.description != new.description)
  THEN
    UPDATE film_text
      SET title=new.title, description=new.description, film_id=new.film_id
      WHERE film_id=old.film_id;
  END IF;
END$$
  
CREATE TRIGGER `del_film` AFTER DELETE ON `film` FOR EACH ROW BEGIN
  DELETE FROM film_text WHERE film_id = OLD.film_id;
END$$
  
DELIMITER ;