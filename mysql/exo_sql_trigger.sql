USE exo_trigger;

## Vide les tables
SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE CITY;
TRUNCATE TABLE COUNTRY;
TRUNCATE TABLE STATISTIC;

SET FOREIGN_KEY_CHECKS=1;

INSERT INTO COUNTRY(name) VALUES
('France'), ('Anglettere'), ('Allemagne'), ('Italie'), ('Espagne');

INSERT INTO `CITY` (`name`, `zipcode`, `population`, `country`) VALUES
('Paris', 75000, 2244000, 1),
('La Flèche', 72200, 17000, 1),
('Londres', 60000, 8136000, 2),
('Rome', 100, 2868000, 4),
('Berlin', 10115, 3470000, 3),
('Madrid', 28001, 3166000, 5),
('Palma De Majorque', 7001, 402949, 5),
('Palerme', 90100, 678492, 4),
('Oxford', 52004, 150200, 2),
('Stuttgart', 70173, 612441, 3);

CALL getPopulationCountry('France');

SELECT * FROM CITY_COUNTRYNAME;