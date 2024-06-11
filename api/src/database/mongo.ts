import { MongoClient } from "mongodb";

import mongoConfig from "../config/mongoConfig";

const client = new MongoClient(mongoConfig.url, mongoConfig.options);

async function initMongo() {
  try {
    await client.connect();
    console.log("Conexión a MongoDB realizada correctamente");
    await createDatabase()
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err);
  }
}

async function close() {
  try {
    await client.close();
    console.log("Conexión a MongoGB cerrada correctamente");
  } catch (err) {
    console.error("Error al cerrar la conexión con la base de datos:", err);
  }
}

async function createDatabase() {
  const exist = await ExistDatabase();
  if (!exist) {
    try {
      const db = client.db(mongoConfig.db);
      await db.createCollection("airsensors")
      await db.createCollection("watersensor")
    } catch (err) {
      console.error("Error al crear la base de datos", err);
    }
  }
}

async function ExistDatabase() {
  try {
    const adminDb = client.db("admin");
    const dbList = await adminDb.admin().listDatabases();
    return dbList.databases.some((db) => db.name === mongoConfig.db);
  } catch (err) {
    console.error("Error al comprobar si la base de datos existe", err);
  }
}

const mongoServer = {
  initMongo,
  close,
  client,
};

export default mongoServer;
