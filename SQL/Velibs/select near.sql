SET @arcTriomphe = POINT(48.873811, 2.294928);

SELECT 
    station_name,
    (ST_DISTANCE(@arcTriomphe, station_position) * 100) AS distance 
FROM stations
ORDER BY distance
LIMIT 5