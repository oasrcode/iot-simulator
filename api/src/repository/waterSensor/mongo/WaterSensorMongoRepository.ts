import { Db, MongoClient } from "mongodb";
import IWaterSensorMongoRepository from "./IWaterSensorMongoRepository";
import WaterSensorData from "../../../models/WaterSensorData";

class WaterSensorMongoRepository implements IWaterSensorMongoRepository {
  private readonly database: Db;
  private readonly collectionName = "watersensors";

  constructor(_database: MongoClient, _dbName: string) {
    this.database = _database.db(_dbName);
  }
  async getWaterSensorDataBySerialnumber(
    serialnumber: string
  ): Promise<WaterSensorData | null> {
    try {
      const sensordata = await this.database
        .collection<WaterSensorData>(this.collectionName)
        .findOne({ serialnumber });

      return sensordata;
    } catch (error) {
      console.error(
        `Error el recuperar el sensor del agua con serialnumber : ${serialnumber}`,
        error
      );
      throw error;
    }
  }
  async postWaterSensorData(data: WaterSensorData): Promise<void> {
    try {
      await this.database
        .collection<WaterSensorData>(this.collectionName)
        .insertOne(data);
    } catch (error) {
      console.error("Error al crear sensor del agua en mongo", error);
      throw error;
    }
  }
  async putWaterSensorData(data: WaterSensorData): Promise<void> {
    try {
      await this.database
        .collection<WaterSensorData>(this.collectionName)
        .updateOne({ serialnumber: data.serialnumber }, { $set: data });
    } catch (error) {
      console.error(
        `Error al actualizar el sensor del agua con serialnumber : ${data.serialnumber}`,
        error
      );
      throw error;
    }
  }
}

export default WaterSensorMongoRepository;
