import AirSensorData from "../../../models/AirSensorData"

interface IAirSensorCrateService{
   saveAirSensorData(data:AirSensorData):Promise<void>
}

export default IAirSensorCrateService