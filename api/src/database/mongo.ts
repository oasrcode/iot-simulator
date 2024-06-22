import { MongoClient } from "mongodb";

import mongoConfig from "../config/mongoConfig";
import AirSensorMongoRepository from "../repository/airSensor/mongo/AirSensorMongoRepository";
import AirSensorMongoService from "../service/airSensor/mongo/AirSensorMongoService";
import WaterSensorMongoRepository from "../repository/waterSensor/mongo/WaterSensorMongoRepository";
import WaterSensorMongoService from "../service/waterSensor/mongo/WaterSensorMongoService";

const CLIENT = new MongoClient(mongoConfig.URL, mongoConfig.OPTIONS);

const airSensorMongoRepository = new AirSensorMongoRepository(CLIENT, mongoConfig.DB);
const airSensorMongoService = new AirSensorMongoService(airSensorMongoRepository);

const waterSensorMongoRepository = new WaterSensorMongoRepository(CLIENT, mongoConfig.DB);
const waterSensorMongoService = new WaterSensorMongoService(waterSensorMongoRepository);

const COLLECTIONS = ["airsensors", "watersensors"];
async function initMongo() {
  try {
    await CLIENT.connect();
    console.log("Conexión a MongoDB realizada correctamente");
    await createCollections();
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err);
  }
}

async function close() {
  try {
    await CLIENT.close();
    console.log("Conexión a MongoGB cerrada correctamente");
  } catch (err) {
    console.error("Error al cerrar la conexión con la base de datos:", err);
  }
}

async function createCollections() {
  const exist = await ExistDatabase();
  if (!exist) {
    try {
      if (!mongoConfig.DB) {
        console.error("Error: Nombre de base de datos no definida en las variables de entorno.");
        return;
      }
      const db = CLIENT.db(mongoConfig.DB);

      COLLECTIONS.forEach(async (i) => {
        await db.createCollection(i);
      });
    } catch (err) {
      console.error("Error al crear la base de datos", err);
      throw err;
    }
  }
}

async function ExistDatabase() {
  try {
    const adminDb = CLIENT.db("admin");
    const dbList = await adminDb.admin().listDatabases();
    return dbList.databases.some((db) => db.name === mongoConfig.DB);
  } catch (err) {
    console.error("Error al comprobar si la base de datos existe", err);
  }
}

const MONGOSERVER = {
  initMongo,
  close,
  CLIENT,
  airSensorMongoService,
  waterSensorMongoService,
};

export default MONGOSERVER;
