import { MongoClient, Db } from "mongodb";

import IAirSensorMongoRepository from "./IAirSensorMongoRepository";
import AirSensorData from "../../../models/AirSensorData";

class AirSensorMongoRepository implements IAirSensorMongoRepository {
  private readonly database: Db;
  private readonly collectionName = "airsensors";

  constructor(_database: MongoClient, _dbName: string) {
    this.database = _database.db(_dbName);
  }
  async getAllAirSensorData(): Promise<AirSensorData[] | null> {
    try {
      let sensorDataList = await this.database.collection<AirSensorData>(this.collectionName).find({}).toArray();
      return sensorDataList;
    } catch (error) {
      throw error;
    }
  }

  async getAirSensorDataBySerialnumber(serialnumber: string): Promise<AirSensorData | null> {
    try {
      const sensordata = await this.database.collection<AirSensorData>(this.collectionName).findOne({ serialnumber });

      return sensordata;
    } catch (error) {
      throw error;
    }
  }
  async postAirSensorData(data: any): Promise<void> {
    try {
      await this.database.collection<AirSensorData>(this.collectionName).insertOne(data);
    } catch (error) {
      throw error;
    }
  }
  async putAirSensorData(data: any): Promise<void> {
    try {
      await this.database.collection<AirSensorData>(this.collectionName).updateOne({ serialnumber: data.serialnumber }, { $set: data });
    } catch (error) {
      throw error;
    }
  }
}
export default AirSensorMongoRepository;
