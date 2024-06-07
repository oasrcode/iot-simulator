import { Client } from "pg";

const client = new Client({
    host: process.env.CRATE_HOST || "localhost",
    port: process.env.CRATE_PORT ? parseInt(process.env.CRATE_PORT) : 5432,
    user: process.env.CRATE_USER || "crate",
});

async function init() {
  try {
    await client.connect();
    console.log("Conexión a CrateDB realizada correctamente");
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err);
  }
}

async function close() {
  try {
    await client.end();
    console.log("Conexión a CrateDB cerrada correctamente");
  } catch (err) {
    console.error("Error al cerrar la conexión con la base de datos:", err);
  }
}

const crateServer = {
  init,
  close,
  client,
};

export default crateServer;
