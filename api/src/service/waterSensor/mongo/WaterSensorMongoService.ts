import WaterSensorData from "../../../models/WaterSensorData";
import IWaterSensorMongoRepository from "../../../repository/waterSensor/mongo/IWaterSensorMongoRepository";
import IWaterSensorMongoService from "./IWaterSensorMongoService";

class WaterSensorMongoService implements IWaterSensorMongoService {
  private waterSensorRepository: IWaterSensorMongoRepository;

  constructor(_waterSensorRepository: IWaterSensorMongoRepository) {
    this.waterSensorRepository = _waterSensorRepository;
  }
  async saveWaterSensorData(data: WaterSensorData): Promise<void> {
    const sensor = await this.getWaterSensorData(data.serialnumber);
    if (!sensor) {
      await this.waterSensorRepository.postWaterSensorData(data);
    } else {
      await this.waterSensorRepository.putWaterSensorData(data);
    }
  }
  async getWaterSensorData(
    serialnumber: string
  ): Promise<WaterSensorData | null> {
    const sensorData =
      await this.waterSensorRepository.getWaterSensorDataBySerialnumber(
        serialnumber
      );

    return sensorData;
  }
}

export default WaterSensorMongoService;
