import { Client } from "pg";
import CRATECONFIG from "../config/crateConfig";
import CRATEDBQUERY from "./queries/cratedbQuery";

import AirSensorCrateRepository from "../repository/crate/AirSensorCrateRepository";
import AirSensorCrateService from "../service/crate/AirSensorCrateService";

const CLIENT = new Client(CRATECONFIG.OPTIONS);
const airSensorCrateRepository = new AirSensorCrateRepository(CLIENT);
const airSensorCrateService = new AirSensorCrateService(
  airSensorCrateRepository
);
async function init() {
  try {
    await CLIENT.connect();
    console.log("Conexión a CrateDB realizada correctamente");
    await createTables();
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err);
    throw err;
  }
}

async function close() {
  try {
    await CLIENT.end();
    console.log("Conexión a CrateDB cerrada correctamente");
  } catch (err) {
    console.error("Error al cerrar la conexión con la base de datos:", err);
    throw err;
  }
}

async function createTables() {
  const query = CRATEDBQUERY.CREATETABLE_AIRSENSOR;
  if (!query) {
    console.error("Error: Consulta no definida para crear la tabla AirSensor");
    return;
  }
  try {
    await CLIENT.query(query);
  } catch (err) {
    console.log("Error al crear la tabla ", err);
    throw err;
  }
}

const CRATEDBSERVER = {
  init,
  close,
  CLIENT,
  airSensorCrateService,
};

export default CRATEDBSERVER;
