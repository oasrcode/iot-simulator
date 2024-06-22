
import { Client } from "pg";
import IAirSensorCrateRepository from "./IAirSensorCrateRepository";
import CRATEDBQUERY from "../../../database/queries/cratedbQuery";
import AirSensorData from "../../../models/AirSensorData";


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
      throw error;
    }
  }
}

export default AirSensorCrateRepository;
