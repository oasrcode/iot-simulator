import { AirQualitySensor } from "./AirQuality.sensor";

export class AirSensors {
  listSensorAir: AirQualitySensor[] = [];

  public generateSensors() {
    let as_CostaAlegre = new AirQualitySensor(
      "0XP3XQ07VV",
      "AirSensor",
      "Sensor de aire - Playa Costa Alegre",
      "Playa Costa Alegre, Arguineguín",
      27.7612412,
      -15.6839901
    );

    let as_Patalavaca = new AirQualitySensor(
      "SPIWPJSZON",
      "AirSensor",
      "Sensor de aire - Playa de Palatavaca",
      "Playa de Patalavaca, Palatavaca",
      27.7704467,
      -15.6884511
    );

    this.listSensorAir.push(as_CostaAlegre);
    this.listSensorAir.push(as_Patalavaca);
  }
}
