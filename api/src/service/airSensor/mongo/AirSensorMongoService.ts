import AirSensorData from "../../../models/AirSensorData";
import IAirSensorMongoRepository from "../../../repository/airSensor/mongo/IAirSensorMongoRepository";
import IAirSensorMongoService from "./IAirSensorMongoService";

class AirSensorMongoService implements IAirSensorMongoService {
  private airSensorRepository: IAirSensorMongoRepository;

  constructor(_airSensorRepository: IAirSensorMongoRepository) {
    this.airSensorRepository = _airSensorRepository;
  }
  async getAirSensorData(serialnumber: string): Promise<AirSensorData | null> {
    const sensorData =
      await this.airSensorRepository.getAirSensorDataBySerialnumber(
        serialnumber
      );

    return sensorData;
  }

  async saveAirSensorData(data: AirSensorData): Promise<void> {
    const sensor = await this.getAirSensorData(data.serialnumber);

    if (!sensor) {
      await this.airSensorRepository.postAirSensorData(data);
    }
    {
      await this.airSensorRepository.putAirSensorData(data);
    }
  }
}

export default AirSensorMongoService;
