import { faker } from "@faker-js/faker";
import { MainData } from "./MainData.sensor";

export class AirQualitySensor extends MainData {
  pm10: number; // PM10 (µg/m³)
  pm2_5: number; // PM2.5 (µg/m³)
  temperature: number; // Temperatura (°C o °F)
  humidity: number; // Humedad relativa (%)
  pressure: number; // Presión atmosférica (mbar o hPa)
  co: number; // CO (ppm o µg/m³)
  no2: number; // NO2 (ppm o µg/m³)
  so2: number; // SO2 (ppm o µg/m³)
  co2: number; // CO2 (ppm o µg/m³)
  constructor(
    serialnumber: string,
    type: string,
    name: string,
    location: string,
    longitude: number,
    latitude: number
  ) {
    super(serialnumber, type, name, location, latitude, longitude);
    this.date = new Date().toString();
    this.pm10 = 0;
    this.pm2_5 = 0;
    this.temperature = 0;
    this.humidity = 0;
    this.pressure = 0;
    this.co = 0;
    this.no2 = 0;
    this.so2 = 0;
    this.co2 = 0;
  }
  generateFakeData(): string {
    return JSON.stringify({
      serialnumber: this.serialnumber,
      name: this.name,
      type: this.type,
      date: new Date().toString(),
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      pm10: faker.number
        .float({ min: 0, max: 100, multipleOf: 0.01 })
        .toFixed(2),
      pm2_5: faker.number
        .float({ min: 0, max: 50, multipleOf: 0.01 })
        .toFixed(2),
      temperature: faker.number
        .float({ min: 15, max: 30, multipleOf: 0.1 })
        .toFixed(1),
      humidity: faker.number
        .float({ min: 30, max: 80, multipleOf: 0.1 })
        .toFixed(1),
      pressure: faker.number
        .float({ min: 900, max: 1100, multipleOf: 0.1 })
        .toFixed(1),
      co: faker.number.float({ min: 0, max: 10, multipleOf: 0.01 }).toFixed(2),
      no2: faker.number.float({ min: 0, max: 5, multipleOf: 0.01 }).toFixed(2),
      so2: faker.number.float({ min: 0, max: 5, multipleOf: 0.01 }).toFixed(2),
      co2: faker.number
        .float({ min: 300, max: 500, multipleOf: 0.1 })
        .toFixed(1),
    });
  }
}
