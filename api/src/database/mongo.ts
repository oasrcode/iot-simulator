import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_URL || "mongodb://mongo:27017";
const client = new MongoClient(url);
;

async function initMongo() {
  try {
    await client.connect();
    console.log("Conexión a MongoDB realizada correctamente");

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

const mongoServer = {
  initMongo,
  close,
  client
};

export default mongoServer;
