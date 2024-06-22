import express, { Router, Request, Response } from "express";
import SensorController from "../controller/sensorController";

const sensorRouter: Router = express.Router();

const sensorController = new SensorController();

sensorRouter.get(
  "/airSensors/:serialnumber",
  async (req: Request, res: Response) => {
    await getSensorData("air", req, res);
  }
);

sensorRouter.get(
  "/waterSensors/:serialnumber",
  async (req: Request, res: Response) => {
    await getSensorData("water", req, res);
  }
);

sensorRouter.get("/waterSensors", async (req: Request, res: Response) => {
  try {
    const data = await sensorController.getAllWaterSensorMongoData();
    return res.status(200).send(data);
  } catch (error) {
    console.log("Error al traerse los watersensors ", error);
    res.status(500).send("Error al traerse los watersensors.");
  }
});
sensorRouter.get("/airSensors", async (req: Request, res: Response) => {
  try {
    const data = await sensorController.getAllAirSensorMongoData();
    return res.status(200).send(data);
  } catch (error) {
    console.log("Error al traerse los airsensors ", error);
    res.status(500).send("Error al traerse los watersensors.");
  }
});

async function getSensorData(type: string, req: Request, res: Response) {
  const { serialnumber } = req.params;

  if (!serialnumber) {
    res.status(400).send(`El valor de serialnumber no es válido.`);
  }

  try {
    const sensorData =
      type == "air"
        ? await sensorController.getAirSensorMongoData(serialnumber)
        : await sensorController.getWaterSensorMongoData(serialnumber);

    return res.status(200).send(sensorData);
  } catch (error) {
    console.log("Error al traerse los datos del sensor: ", error);
    res.status(500).send("Error al traerse los datos del sensor");
  }
}

export default sensorRouter;
