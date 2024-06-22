import AirSensorData from "../../../models/AirSensorData";
import IAirSensorMongoRepository from "../../../repository/airSensor/mongo/IAirSensorMongoRepository";
import IAirSensorMongoService from "./IAirSensorMongoService";

class AirSensorMongoService implements IAirSensorMongoService {
  private airSensorRepository: IAirSensorMongoRepository;

  constructor(_airSensorRepository: IAirSensorMongoRepository) {
    this.airSensorRepository = _airSensorRepository;
  }
  async getAllAirSensorsData(): Promise<AirSensorData[] | null> {
    try {
      return await this.airSensorRepository.getAllAirSensorData();
    } catch (error) {
      throw error;
    }
  }
  async getAirSensorData(serialnumber: string): Promise<AirSensorData | null> {
    try {
      return await this.airSensorRepository.getAirSensorDataBySerialnumber(serialnumber);
    } catch (error) {
      throw error;
    }
  }

  async saveAirSensorData(data: AirSensorData): Promise<void> {
    let sensor = null;
    try {
      sensor = await this.getAirSensorData(data.serialnumber);
    } catch (error) {
      throw error;
    }

    try {
      !sensor ? await this.airSensorRepository.postAirSensorData(data) : await this.airSensorRepository.putAirSensorData(data);
    } catch (error) {
      throw error;
    }
  }
}

export default AirSensorMongoService;
