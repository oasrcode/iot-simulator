import WaterSensorData from "../../../models/WaterSensorData"

interface IWaterSensorMongoRepository{
    getWaterSensorDataBySerialnumber(serialnumber:string):Promise<WaterSensorData | null>
    postWaterSensorData(data:WaterSensorData):Promise<void>
    putWaterSensorData(data:WaterSensorData):Promise<void>
    GetAllWaterSensorsData():Promise<WaterSensorData[]|null>
}


export default IWaterSensorMongoRepository