import AirSensorData from "../../../models/AirSensorData";
import IAirSensorCrateRepository from "../../../repository/airSensor/crate/IAirSensorCrateRepository";
import IAirSensorCrateService from "./IAirSensorCrateservice";


class AirSensorCrateService implements IAirSensorCrateService {
  private _airSensorRepository: IAirSensorCrateRepository;

  constructor(airSensorRepository: IAirSensorCrateRepository) {
    this._airSensorRepository = airSensorRepository;
  }
  async saveAirSensorData(data: AirSensorData): Promise<void> {
   await this._airSensorRepository.postAirSensorData(data)
  }

 
}

export default AirSensorCrateService;
