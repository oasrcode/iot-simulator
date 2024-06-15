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

const CRATEDBQUERY = {
  CREATETABLE_AIRSENSOR,
  INSERT_AIRSENSOR,
};

export default CRATEDBQUERY;
