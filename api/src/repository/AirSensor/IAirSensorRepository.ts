interface IAirSensorRepository{
    getAirSensorDataBySerialnumber(serialnumber:string):Promise<void>
    postAirSensorData(data:any):Promise<void>
    putAirSensorData(data:any):Promise<void>
}