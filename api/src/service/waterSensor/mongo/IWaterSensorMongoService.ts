import WaterSensorData from "../../../models/WaterSensorData"


interface IWaterSensorMongoService{
   saveWaterSensorData(data:WaterSensorData):Promise<void>
   getWaterSensorData(serialnumber:string):Promise<WaterSensorData | null>
}

export default IWaterSensorMongoService