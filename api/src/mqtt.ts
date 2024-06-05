import mqtt, { MqttClient } from "mqtt";
import mqttConfig from "./config/mqttConfig";

const client: MqttClient = mqtt.connect(mqttConfig.mqttOptions);

function init() {
  client.on("connect", () => {
    client.subscribe(mqttConfig.topics.airSensor, (err: Error | null) => {
      if (err) {
        console.error("Error al suscribirse al topic:", err);
      } else {
        console.log(`Suscrito al topic ${mqttConfig.topics.airSensor}`);
      }
    });
  });
  client.on("message", (topic: string, message: Buffer) => {
    if (topic.includes('Sensors/AirSensors')) {
      const data = JSON.parse(message.toString());
   
      console.log(`Mensaje recibido en ${topic}: ${data}`);
    }
  });
  client.on("error", (err: Error) => {
    console.error("Error de conexión:", err);
  });

  client.on("reconnect", () => {
    console.log("Intentando reconectar al servidor MQTT...");
  });

  client.on("close", () => {
    console.log("Conexión MQTT cerrada");
  });

  client.on("offline", () => {
    console.log("Cliente MQTT está offline");
  });
}
const mqttServer={
  init
}

export default mqttServer
