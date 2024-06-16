import { faker } from "@faker-js/faker";
import { MainData } from "./MainData.sensor";

export class WaterQualitySensor extends MainData {
  pH: number; // Nivel de pH del agua
  turbidity: number; // Nivel de turbidez del agua
  dissolvedOxygen: number; // Concentración de oxígeno disuelto (mg/L)
  conductivity: number; // Conductividad eléctrica del agua (µS/cm)
  totalDissolvedSolids: number; // Sólidos disueltos totales (ppm/mg/L)
  residualChlorine: number; // Nivel de cloro residual (ppm/mg/L)
  lead: number; // Concentración de plomo (µg/L)
  mercury: number; // Concentración de mercurio (µg/L)
  arsenic: number; // Concentración de arsénico ((µg/L)

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
    this.pH = 0;
    this.turbidity = 0;
    this.dissolvedOxygen = 0;
    this.conductivity = 0;
    this.totalDissolvedSolids = 0;
    this.residualChlorine = 0;
    this.lead = 0;
    this.mercury = 0;
    this.arsenic = 0;
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
      pH: faker.number.float({ min: 7, max: 8.5, multipleOf: 0.01 }).toFixed(2),
      turbidity: faker.number
        .float({ min: 0, max: 2, multipleOf: 0.01 })
        .toFixed(2),
      dissolvedOxygen: faker.number
        .float({ min: 5, max: 9, multipleOf: 0.01 })
        .toFixed(1),
      conductivity: faker.number
        .float({ min: 600, max: 800, multipleOf: 0.01 })
        .toFixed(0),
      totalDissolvedSolids: faker.number
        .float({ min: 300, max: 500, multipleOf: 0.01 })
        .toFixed(0),
      residualChlorine: faker.number
        .float({ min: 0.1, max: 0.5, multipleOf: 0.01 })
        .toFixed(2),
      lead: faker.number.float({ min: 0, max: 10,multipleOf: 0.01 }).toFixed(2),
      mercury: faker.number.float({ min: 0, max: 1,multipleOf: 0.01 }).toFixed(2),
      arsenic: faker.number.float({ min: 0, max: 10,multipleOf: 0.01 }).toFixed(2),
    });
  }
}
