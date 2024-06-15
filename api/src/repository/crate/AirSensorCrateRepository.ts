import AirSensorData from "../../models/AirSensorData";
import { Client } from "pg";
import IAirSensorCrateRepository from "./IAirSensorCrateRepository";
import CRATEDBQUERY from "../../database/queries/cratedbQuery";

class AirSensorCrateRepository implements IAirSensorCrateRepository {
  private readonly cliente: Client;

  constructor(_client: Client) {
    this.cliente = _client;
  }

  async postAirSensorData(data: AirSensorData): Promise<void> {
    const query = CRATEDBQUERY.INSERT_AIRSENSOR;
    const values = Object.values(data);
 
    try {
      await this.cliente.query(query, values);
    } catch (error) {
      console.error("Error al insertar los datos:", error);
      throw error;
    }
  }
}

export default AirSensorCrateRepository;
