import { Request, Response } from "express";
import AirSensorData from "../models/AirSensorData";
import CRATEDBSERVER from "../database/crate";
import MONGOSERVER from "../database/mongo";

class SensorController {

  async getAirSensorMongoData(serialnumber:string): Promise<AirSensorData | null> {
    
    const sensorData = await MONGOSERVER.airSensorMongoService.getAirSensorData(serialnumber)
    return sensorData;
  }

  async storageAirSensorMongoData(data: AirSensorData): Promise<void> {
    await MONGOSERVER.airSensorMongoService.saveAirSensorData(data);
  }

  async storageAirSensorCrateData(data: AirSensorData): Promise<void> {
    await CRATEDBSERVER.airSensorCrateService.saveAirSensorData(data);
  }
}

export default SensorController;
