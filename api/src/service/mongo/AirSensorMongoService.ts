import AirSensorData from "../../models/AirSensorData";
import IAirSensorMongoRepository from "../../repository/mongo/IAirSensorMongoRepository";
import IAirSensorMongoService from "./IAirSensorMongoService";



class AirSensorMongoService implements IAirSensorMongoService {
  private _airSensorRepository: IAirSensorMongoRepository;

  constructor(airSensorRepository: IAirSensorMongoRepository) {
    this._airSensorRepository = airSensorRepository;
  }

  async saveAirSensorData(data: AirSensorData): Promise<void> {
    const sensor =
      await this._airSensorRepository.getAirSensorDataBySerialnumber(
        data.serialnumber
      );

    if (!sensor) {
      await this._airSensorRepository.postAirSensorData(data);
    }
    {
      await this._airSensorRepository.putAirSensorData(data);
    }
  }

  async getAirSensorData(serialnumber:string): Promise<void> {
  
  }
}

export default AirSensorMongoService;
