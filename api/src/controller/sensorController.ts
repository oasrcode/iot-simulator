import AirSensorData from "../models/AirSensorData";
import CRATEDBSERVER from "../database/crate";
import MONGOSERVER from "../database/mongo";
import WaterSensorData from "../models/WaterSensorData";

class SensorController {
  async getAirSensorMongoData(serialnumber: string): Promise<AirSensorData | null> {
    return await MONGOSERVER.airSensorMongoService.getAirSensorData(serialnumber);
  }

  async getWaterSensorMongoData(serialnumber: string): Promise<WaterSensorData | null> {
    return await MONGOSERVER.waterSensorMongoService.getWaterSensorData(serialnumber);
  }
  async getAllAirSensorMongoData(): Promise<AirSensorData[] | null> {
    try {
      return await MONGOSERVER.airSensorMongoService.getAllAirSensorsData();
    } catch (error) {
      throw error;
    }
  }

  async getAllWaterSensorMongoData(): Promise<WaterSensorData[] | null> {
    try {
      return await MONGOSERVER.waterSensorMongoService.getAllWaterSensorsData();
    } catch (error) {
      throw error;
    }
  }

  async storageAirSensorMongoData(data: AirSensorData): Promise<void> {
    try {
      await MONGOSERVER.airSensorMongoService.saveAirSensorData(data);
    } catch (error) {
      throw error;
    }
  }

  async storageAirSensorCrateData(data: AirSensorData): Promise<void> {
    try {
      await CRATEDBSERVER.airSensorCrateService.saveAirSensorData(data);
    } catch (error) {
      throw error;
    }
  }

  async storageWaterSensorMongoData(data: WaterSensorData): Promise<void> {
    try {
      await MONGOSERVER.waterSensorMongoService.saveWaterSensorData(data);
    } catch (error) {
      throw error;
    }
  }

  async storageWaterSensorCrateData(data: WaterSensorData): Promise<void> {
    try {
      await CRATEDBSERVER.waterSensorCrateService.postWaterSensorData(data);
    } catch (error) {
      throw error;
    }
  }
}

export default SensorController;
