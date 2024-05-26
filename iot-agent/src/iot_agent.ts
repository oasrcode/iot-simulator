import { AirSensors } from "./sensors/AirSensors";
const mqtt = require("mqtt");
require('dotenv').config();
const mqttOptions = {
    host: process.env.MQTT_HOST || "localhost", // Host del broker MQTT
    port: process.env.MQTT_PORT || 1883, // Puerto del broker MQTT
    username: process.env.MQTT_USERNAME || "admin", // Usuario del broker MQTT
    password: process.env.MQTT_PASSWORD || "admin", // Contraseña del broker MQTT
    clientId: process.env.MQTT_CLIENT_ID || "iot_agent", // Identificador del cliente MQTT
  };
const client = mqtt.connect(mqttOptions);
const topicAirSensor = "Sensors/AirSensors/";
const airSensor = new AirSensors();
client.on("connect", () => {
  console.log("Conectado al broker MQTT");
  airSensor.generateSensors();
  setInterval(() => {
    airSensor.listSensorAir.forEach((sensor) => {
      publishData(sensor.generateFakeData(), topicAirSensor);
    });
  }, 5000);

  function publishData(data: string, topic: string) {
    client.publish(topic, data, (err: Error) => {
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
