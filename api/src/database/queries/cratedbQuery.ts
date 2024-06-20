const CREATETABLE_AIRSENSOR = `
 CREATE TABLE IF NOT EXISTS air_sensor(
    serialnumber STRING NOT NULL,
    name STRING NOT NULL,
    type STRING NOT NULL,
    date TIMESTAMP NOT NULL,
    location STRING NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    pm10 DOUBLE NOT NULL,
    pm2_5 DOUBLE NOT NULL,
    temperature DOUBLE NOT NULL,
    humidity DOUBLE NOT NULL,
    pressure DOUBLE NOT NULL,
    co DOUBLE NOT NULL,
    no2 DOUBLE NOT NULL,
    so2 DOUBLE NOT NULL,
    co2 DOUBLE NOT NULL
);
`;
const CREATETABLE_WATERSENSOR = `
 CREATE TABLE IF NOT EXISTS water_sensor(
    serialnumber STRING NOT NULL,
    name STRING NOT NULL,
    type STRING NOT NULL,
    date TIMESTAMP NOT NULL,
    location STRING NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    ph DOUBLE NOT NULL,
    turbidity DOUBLE NOT NULL,
    dissolvedOxygen DOUBLE NOT NULL,
    conductivity DOUBLE NOT NULL,
    totalDissolvedSolids DOUBLE NOT NULL,
    residualChlorine DOUBLE NOT NULL,
    lead DOUBLE NOT NULL,
    mercury DOUBLE NOT NULL,
    arsenic DOUBLE NOT NULL
);
`;
const INSERT_AIRSENSOR = `
  INSERT INTO air_sensor (
    serialnumber,
    name,
    type,
    date,
    location,
    latitude,
    longitude,
    pm10,
    pm2_5,
    temperature,
    humidity,
    pressure,
    co,
    no2,
    so2,
    co2
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
`;

const INSERT_WATERSENSOR = `
  INSERT INTO water_sensor (
    serialnumber,
    name,
    type,
    date,
    location,
    latitude,
    longitude,
    ph,
    turbidity,
    dissolvedOxygen,
    conductivity,
    totalDissolvedSolids,
    residualChlorine,
    lead,
    mercury,
    arsenic
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
`;;

const CRATEDBQUERY = {
  CREATETABLE_AIRSENSOR,
  CREATETABLE_WATERSENSOR,
  INSERT_AIRSENSOR,
  INSERT_WATERSENSOR,
};

export default CRATEDBQUERY;
