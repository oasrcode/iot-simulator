import express, { Router, Request, Response, NextFunction } from "express";
import SensorController from "../controller/sensorController";

const sensorRouter: Router = express.Router();

const sensorController = new SensorController();

sensorRouter.get("/airSensors/:serialnumber", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await handlerGetSensorData("air", req, res, next);
  } catch (error) {
    next(error);
  }
});

sensorRouter.get("/waterSensors/:serialnumber", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await handlerGetSensorData("water", req, res, next);
  } catch (error) {
    next(error);
  }
});

sensorRouter.get("/waterSensors", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await sensorController.getAllWaterSensorMongoData();
    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
sensorRouter.get("/airSensors", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await sensorController.getAllAirSensorMongoData();
    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const serialNumberPattern = /^[A-Z0-9]{10}$/;

async function handlerGetSensorData(type: string, req: Request, res: Response, next: NextFunction) {
  const { serialnumber } = req.params;

  if (!serialnumber || !serialNumberPattern.test(serialnumber)) {
    return res.status(400).send(`El valor de serialnumber no es válido.`);
  }

  try {
    const sensorData = type == "air" ? await sensorController.getAirSensorMongoData(serialnumber) : await sensorController.getWaterSensorMongoData(serialnumber);

    return res.status(200).send(sensorData);
  } catch (error) {
    next(error);
  }
}

export default sensorRouter;
