import { Db, MongoClient } from "mongodb";
import IWaterSensorMongoRepository from "./IWaterSensorMongoRepository";
import WaterSensorData from "../../../models/WaterSensorData";

class WaterSensorMongoRepository implements IWaterSensorMongoRepository {
  private readonly database: Db;
  private readonly collectionName = "watersensors";

  constructor(_database: MongoClient, _dbName: string) {
    this.database = _database.db(_dbName);
  }
  async GetAllWaterSensorsData(): Promise<WaterSensorData[] | null> {
    try {
      let sensorDataList = await this.database.collection<WaterSensorData>(this.collectionName).find({}).toArray();
      return sensorDataList;
    } catch (error) {
      throw error;
    }
  }
  async getWaterSensorDataBySerialnumber(serialnumber: string): Promise<WaterSensorData | null> {
    try {
      const sensordata = await this.database.collection<WaterSensorData>(this.collectionName).findOne({ serialnumber });

      return sensordata;
    } catch (error) {
      throw error;
    }
  }
  async postWaterSensorData(data: WaterSensorData): Promise<void> {
    try {
      await this.database.collection<WaterSensorData>(this.collectionName).insertOne(data);
    } catch (error) {
      throw error;
    }
  }
  async putWaterSensorData(data: WaterSensorData): Promise<void> {
    try {
      await this.database.collection<WaterSensorData>(this.collectionName).updateOne({ serialnumber: data.serialnumber }, { $set: data });
    } catch (error) {
      throw error;
    }
  }
}

export default WaterSensorMongoRepository;
