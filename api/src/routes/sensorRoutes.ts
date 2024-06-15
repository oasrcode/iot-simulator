import express, { Router,Request,Response } from "express";
import SensorController from "../controller/sensorController";


const sensorRouter: Router = express.Router();

const sensorController = new SensorController();

sensorRouter.get('/airSensors/:serialnumber', async (req: Request, res: Response) => {
    const {serialnumber} = req.params

    if(!serialnumber){
        res.status(400).send(`El valor de serialnumber no es válido.`)
    }
    const sensorData = await sensorController.getAirSensorMongoData(serialnumber); 

    res.status(200).send(sensorData)
});

export default sensorRouter;