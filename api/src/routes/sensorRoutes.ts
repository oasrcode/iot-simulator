import express, { Router,Request,Response } from "express";
import SensorController from "../controller/sensorController";


const sensorRouter: Router = express.Router();

const sensorController = new SensorController();

sensorRouter.get('/airSensors/:serialnumber', async (req: Request, res: Response) => {
    await sensorController.getAirSensorMongoData(req, res); 
});

export default sensorRouter;