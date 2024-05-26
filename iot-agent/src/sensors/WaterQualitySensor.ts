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

  generateFakeData():string {
    return JSON.stringify({
      pH: faker.number.float({ min: 7, max: 8.5, precision: 0.01 }).toFixed(2),
      turbidity: faker.number
        .float({ min: 0, max: 2, precision: 0.01 })
        .toFixed(2),
      dissolvedOxygen: faker.number
        .float({ min: 5, max: 9, precision: 0.1 })
        .toFixed(1),
      conductivity: faker.number
        .float({ min: 600, max: 800, precision: 1 })
        .toFixed(0),
      totalDissolvedSolids: faker.number
        .float({ min: 300, max: 500, precision: 1 })
        .toFixed(0),
      residualChlorine: faker.number
        .float({ min: 0.1, max: 0.5, precision: 0.01 })
        .toFixed(2),
      lead: faker.number.float({ min: 0, max: 10 }).toFixed(2),
      mercury: faker.number.float({ min: 0, max: 1 }).toFixed(2),
      arsenic: faker.number.float({ min: 0, max: 10 }).toFixed(2),
    });
  }
}
