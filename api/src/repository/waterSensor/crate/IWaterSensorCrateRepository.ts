import WaterSensorData from "../../../models/WaterSensorData";


interface IWaterSensorCrateRepository {
  postWaterSensorData(data: WaterSensorData): Promise<void>;
}

export default IWaterSensorCrateRepository
