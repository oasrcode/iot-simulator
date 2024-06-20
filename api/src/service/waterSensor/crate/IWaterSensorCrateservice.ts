import WaterSensorData from "../../../models/WaterSensorData"

interface IWaterSensorCrateService{
   saveWaterSensorData(data:WaterSensorData):Promise<void>
}

export default IWaterSensorCrateService