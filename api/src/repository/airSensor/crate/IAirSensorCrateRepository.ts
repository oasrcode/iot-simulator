import AirSensorData from "../../models/AirSensorData";

interface IAirSensorCrateRepository {
  postAirSensorData(data: AirSensorData): Promise<void>;
}

export default IAirSensorCrateRepository
