import { WaterQualitySensor } from "./WaterQuality.sensor";

export class WaterSensors {
  waterSensorList: WaterQualitySensor[] = [];

  public generateSensors() {
    let ws_CostaAlegre = new WaterQualitySensor(
      "MJBPICLTHG",
      "WaterSensor",
      "Sensor de agua - Playa Costa Alegre",
      "Playa Costa Alegre, Arguineguín",
      27.7608888,
      -15.6849175
    );

    let ws_Patalavaca = new WaterQualitySensor(
      "XCVZ86U3LL",
      "WaterSensor",
      "Sensor de agua - Playa de Palatavaca",
      "Playa de Patalavaca, Palatavaca",
      27.7699744,
      -15.6910586
    );

    this.waterSensorList.push(ws_CostaAlegre);
    this.waterSensorList.push(ws_Patalavaca);
  }
}
