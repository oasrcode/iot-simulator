import { AirSensors } from "./sensors/AirSensors";
import { WaterSensors } from "./sensors/WaterSensors";
import mqtt, { MqttClient, IClientOptions } from "mqtt";

require("dotenv").config();

const MQTTOPTIONS: IClientOptions = {
  host: process.env.MQTT_HOST || "localhost", // Host del broker MQTT
  port: process.env.MQTT_PORT ? Number.parseInt(process.env.MQTT_PORT) : 1883, // Puerto del broker MQTT
  username: process.env.MQTT_USERNAME || "admin", // Usuario del broker MQTT
  password: process.env.MQTT_PASSWORD || "admin", // Contraseña del broker MQTT
  clientId: process.env.MQTT_CLIENT_ID || "iot_agent", // Identificador del cliente MQTT
};

const client: MqttClient = mqtt.connect(MQTTOPTIONS);
const topicAirSensor = "Sensors/AirSensors/";
const topicWaterSensor ="Sensors/WaterSensors/"
const airSensors = new AirSensors();
const waterSensors = new WaterSensors();
client.on("connect", () => {
  console.log("Generador de sensores conectado al broker MQTT");
  airSensors.generateSensors();
  waterSensors.generateSensors();

  setInterval(() => {
    airSensors.airSensorsList.forEach((sensor) => {
      let sensorTopic = `${sensor.name}/data`;
      publishData(sensor.generateFakeData(), topicAirSensor + sensorTopic);
    });
  }, 10000);


  setInterval(() => {
    waterSensors.waterSensorList.forEach((sensor) => {
      let sensorTopic = `${sensor.name}/data`;
      publishData(sensor.generateFakeData(), topicWaterSensor + sensorTopic);
    });
  }, 10000);

  function publishData(data: string, topic: string) {
    client.publish(topic, data, (err) => {
      if (err) {
        console.error("Error al enviar mensaje:", err);
      } else {
        console.log("Enviado => " + data);
      }
    });
  }
});

client.on("error", (err: Error) => {
  console.error("Error de conexión:", err);
});
