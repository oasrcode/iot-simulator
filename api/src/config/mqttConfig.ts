import { IClientOptions } from "mqtt";

import dotenv from "dotenv";

dotenv.config();

const topics = {
  airSensor:"Sensors/AirSensors/+/data",
};

const options: IClientOptions = {
  host: process.env.MQTT_HOST || "localhost",
  port: process.env.MQTT_PORT ? Number.parseInt(process.env.MQTT_PORT) : 1883,
  username: process.env.MQTT_USERNAME || "admin",
  password: process.env.MQTT_PASSWORD || "admin",
  clientId: process.env.MQTT_CLIENT_ID || "iot_api",
};
const mqttConfig = {
  options,
  topics,
};

export default mqttConfig;
