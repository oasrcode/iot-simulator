import AirSensorData from "../../models/AirSensorData"

interface IAirSensorMongoService{
   saveAirSensorData(data:AirSensorData):Promise<void>
}

export default IAirSensorMongoService