
import dotenv from "dotenv";
import { IClientOptions } from "mqtt/*";

dotenv.config();

const TOPICS = {
  AIRSENSOR: "Sensors/AirSensors/+/data",
  WATERSENSOR:"Sensors/WaterSensors/+/data"
};

const OPTIONS: IClientOptions = {
  host: process.env.MQTT_HOST || "localhost",
  port: process.env.MQTT_PORT ? Number.parseInt(process.env.MQTT_PORT) : 1883,
  username: process.env.MQTT_USERNAME || "admin",
  password: process.env.MQTT_PASSWORD || "admin",
  clientId: process.env.MQTT_CLIENT_ID || "iot_api",
};
const MQTTCONFIG = {
  OPTIONS,
  TOPICS,
};

export default MQTTCONFIG;
