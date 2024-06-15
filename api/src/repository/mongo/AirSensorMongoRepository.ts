import { MongoClient, Db } from "mongodb";

import AirSensorData from "../../models/AirSensorData";
import IAirSensorMongoRepository from "./IAirSensorMongoRepository";

class AirSensorMongoRepository implements IAirSensorMongoRepository {
  private readonly database: Db;
  private readonly collectionName = "airsensors";

  constructor(_database: MongoClient, _dbName: string) {
    this.database = _database.db(_dbName);
  }

  async getAirSensorDataBySerialnumber(
    serialnumber: string
  ): Promise<AirSensorData | null> {
    try {
      const sensordata = await this.database
        .collection<AirSensorData>(this.collectionName)
        .findOne({ serialnumber });

      return sensordata;
    } catch (error) {
      console.error(
        `Error el recuperar el airSensor con serialnumber : ${serialnumber}`,
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
      console.error("Error al crear airSensor en mongo", error);
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
        `Error al actualizar el airSensor con serialnumber : ${data.serialnumber}`,
        error
      );
      throw error;
    }
  }
}
export default AirSensorMongoRepository;
