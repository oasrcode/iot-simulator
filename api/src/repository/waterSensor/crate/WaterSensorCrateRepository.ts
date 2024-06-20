
import { Client } from "pg";
import CRATEDBQUERY from "../../../database/queries/cratedbQuery";
import AirSensorData from "../../../models/AirSensorData";
import IWaterSensorCrateRepository from "./IWaterSensorCrateRepository";
import WaterSensorData from "../../../models/WaterSensorData";


class WaterSensorCrateRepository implements IWaterSensorCrateRepository {
  private readonly cliente: Client;

  constructor(_client: Client) {
    this.cliente = _client;
  }
  async postWaterSensorData(data: WaterSensorData): Promise<void> {
    const query = CRATEDBQUERY.INSERT_WATERSENSOR;
    const values = Object.values(data);
 
    try {
      await this.cliente.query(query, values);
    } catch (error) {
      console.error("Error al insertar los datos:", error);
      throw error;
    }
  }

 
}

export default WaterSensorCrateRepository;
