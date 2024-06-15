import AirSensorData from "../../models/AirSensorData"

interface IAirSensorMongoService{
   saveAirSensorData(data:AirSensorData):Promise<void>
   getAirSensorData(serialnumber:string):Promise<AirSensorData | null>
}

export default IAirSensorMongoService