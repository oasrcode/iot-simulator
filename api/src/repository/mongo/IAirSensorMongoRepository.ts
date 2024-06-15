import AirSensorData from "../../models/AirSensorData"


interface IAirSensorMongoRepository{
    getAirSensorDataBySerialnumber(serialnumber:string):Promise<AirSensorData | null>
    postAirSensorData(data:AirSensorData):Promise<void>
    putAirSensorData(data:AirSensorData):Promise<void>
}

export default IAirSensorMongoRepository