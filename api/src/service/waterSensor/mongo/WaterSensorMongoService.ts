import WaterSensorData from "../../../models/WaterSensorData";
import IWaterSensorMongoRepository from "../../../repository/waterSensor/mongo/IWaterSensorMongoRepository";
import IWaterSensorMongoService from "./IWaterSensorMongoService";

class WaterSensorMongoService implements IWaterSensorMongoService {
  private waterSensorRepository: IWaterSensorMongoRepository;

  constructor(_waterSensorRepository: IWaterSensorMongoRepository) {
    this.waterSensorRepository = _waterSensorRepository;
  }
  async getAllWaterSensorsData(): Promise<WaterSensorData[] | null> {
    const sensorDataList = await this.waterSensorRepository.GetAllWaterSensorsData();
    return sensorDataList;
  }
  async saveWaterSensorData(data: WaterSensorData): Promise<void> {
    const sensor = await this.getWaterSensorData(data.serialnumber);
    if (!sensor) {
      await this.waterSensorRepository.postWaterSensorData(data);
    } else {
      await this.waterSensorRepository.putWaterSensorData(data);
    }
  }
  async getWaterSensorData(serialnumber: string): Promise<WaterSensorData | null> {
    try {
      return await this.waterSensorRepository.getWaterSensorDataBySerialnumber(serialnumber);
    } catch (error) {
      throw error;
    }
  }
}

export default WaterSensorMongoService;
