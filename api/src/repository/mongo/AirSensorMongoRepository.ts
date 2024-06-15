import { MongoClient, Db } from "mongodb";

import AirSensorData from "../../models/AirSensorData";
import IAirSensorMongoRepository from "./IAirSensorMongoRepository";

class AirSensorMongoRepository implements IAirSensorMongoRepository {
  private readonly database: Db;
  private readonly collectionName = "airsensors";

  constructor(_database: MongoClient, _dbName: string) {
    this.database = _database.db(_dbName);
  }

  async getAirSensorDataBySerialnumber(serialnumber: string): Promise<any> {
    try {
      return await this.database
        .collection<AirSensorData>(this.collectionName)
        .findOne({ serialnumber });
    } catch (error) {
      console.error(
        `Failed to get air sensor data by serial number: ${serialnumber}`,
        error
      );
      throw error;
    }
  }
  async postAirSensorData(data: any): Promise<void> {
    try {
      await this.database
        .collection<AirSensorData>(this.collectionName)
        .insertOne(data);
    } catch (error) {
      console.error("Failed to post air sensor data", error);
      throw error;
    }
  }
  async putAirSensorData(data: any): Promise<void> {
    try {
      await this.database
        .collection<AirSensorData>(this.collectionName)
        .updateOne({ serialnumber: data.serialnumber }, { $set: data });
    } catch (error) {
      console.error(
        `Failed to update air sensor data with serial number: ${data.serialnumber}`,
        error
      );
      throw error;
    }
  }
}
export default AirSensorMongoRepository;
