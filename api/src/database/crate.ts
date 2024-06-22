import { Client } from "pg";
import CRATECONFIG from "../config/crateConfig";
import CRATEDBQUERY from "./queries/cratedbQuery";
import AirSensorCrateRepository from "../repository/airSensor/crate/AirSensorCrateRepository";
import AirSensorCrateService from "../service/airSensor/crate/AirSensorCrateService";
import WaterSensorCrateRepository from "../repository/waterSensor/crate/WaterSensorCrateRepository";
import WaterSensorCrateService from "../service/waterSensor/crate/WaterSensorCrateService";

const CLIENT = new Client(CRATECONFIG.OPTIONS);

const airSensorCrateRepository = new AirSensorCrateRepository(CLIENT);
const airSensorCrateService = new AirSensorCrateService(airSensorCrateRepository);

const waterSensorCrateRepository = new WaterSensorCrateRepository(CLIENT);
const waterSensorCrateService = new WaterSensorCrateService(waterSensorCrateRepository);
async function init() {
  try {
    await CLIENT.connect();
    console.log("Conexión a CrateDB realizada correctamente");
    await createTables(CRATEDBQUERY.CREATETABLE_AIRSENSOR);
    await createTables(CRATEDBQUERY.CREATETABLE_WATERSENSOR);
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

async function createTables(query: string) {
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
  waterSensorCrateService,
};

export default CRATEDBSERVER;
