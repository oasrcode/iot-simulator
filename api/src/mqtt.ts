import MQTTCONFIG from "./config/mqttConfig";
import AirSensorData from "./models/AirSensorData";
import SensorController from "./controller/sensorController";
import mqtt, { MqttClient } from "mqtt";
import WaterSensorData from "./models/WaterSensorData";

const client: MqttClient = mqtt.connect(MQTTCONFIG.OPTIONS);

function init() {
  client.on("connect", () => {
    client.subscribe(MQTTCONFIG.TOPICS.AIRSENSOR, (err: Error | null) => {
      if (err) {
        console.error("Error al suscribirse al topic:", err);
      } else {
        console.log(`Suscrito al topic ${MQTTCONFIG.TOPICS.AIRSENSOR}`);
      }
    });

    client.subscribe(MQTTCONFIG.TOPICS.WATERSENSOR, (err: Error | null) => {
      if (err) {
        console.error("Error al suscribirse al topic:", err);
      } else {
        console.log(`Suscrito al topic ${MQTTCONFIG.TOPICS.AIRSENSOR}`);
      }
    });
  });

  client.on("message", async (topic: string, message: Buffer) => {
    if (topic.includes("Sensors/AirSensors")) {
      const jsonData = JSON.parse(message.toString());
      let airSensorData = new AirSensorData();
      airSensorData.parseData(jsonData);
      airSensorData.printData();
      await StoreAirSensorData(airSensorData);
    }

    if (topic.includes("Sensors/WaterSensors")) {
      const jsonData = JSON.parse(message.toString());
      let waterSensorData = new WaterSensorData();
      waterSensorData.parseData(jsonData);
      waterSensorData.printData();
      await StoreWaterSensorData(waterSensorData)
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

async function StoreAirSensorData(sensorData: AirSensorData) {
  try {
    const sensorController: SensorController = new SensorController();
    await sensorController.storageAirSensorMongoData(sensorData);
  } catch (error) {
    console.error(
      "Error al almacenar los datos del sensor de aire en mongo :",
      error
    );
  }

  try {
    const sensorController: SensorController = new SensorController();
    await sensorController.storageAirSensorCrateData(sensorData);
  } catch (error) {
    console.error(
      "Error al almacenar los datos del sensor de aire en crate:",
      error
    );
  }
}

async function StoreWaterSensorData(sensorData: WaterSensorData) {
  try {
    const sensorController: SensorController = new SensorController();
    await sensorController.storageWaterSensorMongoData(sensorData);
  } catch (error) {
    console.error(
      "Error al almacenar los datos del sensor de agua en mongo :",
      error
    );
  }

  try {
    const sensorController: SensorController = new SensorController();
    await sensorController.storageWaterSensorCrateData(sensorData);
  } catch (error) {
    console.error(
      "Error al almacenar los datos del sensor de agua en crate:",
      error
    );
  }
}
const mqttServer = {
  init,
};

export default mqttServer;
