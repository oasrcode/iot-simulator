interface IWaterSensorData {
  serialnumber: string;
  name: string;
  type: string;
  date: Date;
  location: string;
  latitude: number;
  longitude: number;
  pH: number; // Nivel de pH del agua
  turbidity: number; // Nivel de turbidez del agua
  dissolvedOxygen: number; // Concentración de oxígeno disuelto (mg/L)
  conductivity: number; // Conductividad eléctrica del agua (µS/cm)
  totalDissolvedSolids: number; // Sólidos disueltos totales (ppm/mg/L)
  residualChlorine: number; // Nivel de cloro residual (ppm/mg/L)
  lead: number; // Concentración de plomo (µg/L)
  mercury: number; // Concentración de mercurio (µg/L)
  arsenic: number; // Concentración de arsénico ((µg/L)
}

class WaterSensorData implements IWaterSensorData {
  serialnumber: string = "";
  name: string = "";
  type: string = "";
  date: Date = new Date();
  location: string = "";
  latitude: number = 0;
  longitude: number = 0;
  pH: number = 0;
  turbidity: number = 0;
  dissolvedOxygen: number = 0;
  conductivity: number = 0;
  totalDissolvedSolids: number = 0;
  residualChlorine: number = 0;
  lead: number = 0;
  mercury: number = 0;
  arsenic: number = 0;

  constructor() {}
  parseData(obj: any): void {
    this.serialnumber = obj.serialnumber;
    this.name = obj.name;
    this.type = obj.type;
    this.date = new Date(obj.date);
    this.location = obj.location;
    this.latitude = parseFloat(obj.latitude);
    this.longitude = Number(obj.longitude);
    this.pH = Number(obj.pH);
    this.turbidity = Number(obj.turbidity);
    this.dissolvedOxygen = Number(obj.dissolvedOxygen);
    this.conductivity = Number(obj.conductivity);
    this.totalDissolvedSolids = Number(obj.totalDissolvedSolids);
    this.residualChlorine = Number(obj.residualChlorine);
    this.lead = Number(obj.lead);
    this.mercury = Number(obj.mercury);
    this.arsenic = Number(obj.arsenic);
  }
  printData(): void {
    console.log(`${new Date().toISOString()} Mensaje recibido en el sensor ${this.name}`);
    console.log(`Datos: 
      Serial Number: ${this.serialnumber}, Name: ${this.name}, Type: ${this.type}, Date: ${this.date.toISOString()}, Location: ${this.location}, Latitude: ${this.latitude}, 
      Longitude: ${this.longitude}, pH: ${this.pH}, Turbidity: ${this.turbidity}, Dissolved Oxygen: ${this.dissolvedOxygen}, Conductivity: ${this.conductivity}, Total Dissolved Solids: ${
      this.totalDissolvedSolids
    }, 
      Residual Chlorine: ${this.residualChlorine}, Lead: ${this.lead}, Mercury: ${this.mercury}, Arsenic: ${this.arsenic}`);
    console.log(`--------------------------------------------------`);
  }
}

export default WaterSensorData;
