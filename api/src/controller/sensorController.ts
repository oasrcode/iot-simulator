import AirSensorData from "../models/AirSensorData";
import CRATEDBSERVER from "../database/crate";
import MONGOSERVER from "../database/mongo";
import WaterSensorData from "../models/WaterSensorData";

class SensorController {
  async getAirSensorMongoData(
    serialnumber: string
  ): Promise<AirSensorData | null> {
    return await MONGOSERVER.airSensorMongoService.getAirSensorData(
      serialnumber
    );
  }

  async getWaterSensorMongoData(
    serialnumber: string
  ): Promise<WaterSensorData | null> {
    return await MONGOSERVER.waterSensorMongoService.getWaterSensorData(
      serialnumber
    );
  }
  async getAllAirSensorMongoData(): Promise<AirSensorData[] | null> {
    return await MONGOSERVER.airSensorMongoService.getAllAirSensorsData();
  }


  async getAllWaterSensorMongoData(): Promise<WaterSensorData[] | null> {
    return await MONGOSERVER.waterSensorMongoService.getAllWaterSensorsData();
  }

  async storageAirSensorMongoData(data: AirSensorData): Promise<void> {
    await MONGOSERVER.airSensorMongoService.saveAirSensorData(data);
  }

  async storageAirSensorCrateData(data: AirSensorData): Promise<void> {
    await CRATEDBSERVER.airSensorCrateService.saveAirSensorData(data);
  }

  async storageWaterSensorMongoData(data: WaterSensorData): Promise<void> {
    await MONGOSERVER.waterSensorMongoService.saveWaterSensorData(data);
  }

  async storageWaterSensorCrateData(data: WaterSensorData): Promise<void> {
    await CRATEDBSERVER.waterSensorCrateService.postWaterSensorData(data);
  }
}

export default SensorController;
