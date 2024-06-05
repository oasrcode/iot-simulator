import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const url = "mongodb://localhost:27017" || "mongodb://mongo:27017";
const client = new MongoClient(url);
const dbName = "iot-Dashboard";

async function initMongo() {
  try {
    await client.connect();
    console.log("Conexión a MongoDB realizada correctamente");

    const db = client.db(dbName);
    console.log(`Base de datos: ${db.databaseName}`);

    const collection = db.collection("documents");
    console.log(`Colección: ${collection.collectionName}`);
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err);
  }
}

const MongoServer = {
  initMongo,
};

export default MongoServer;
