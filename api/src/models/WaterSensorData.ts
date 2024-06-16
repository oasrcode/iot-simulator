interface IWaterSensorData {
    serialnumber: string;
    name: string;
    type: string;
    date: Date;
    location: string;
    latitude: number;
    longitude: number;
    pm10: number; 
    pm2_5: number; 
    temperature: number; 
    humidity: number; 
    pressure: number; 
    co: number; 
    no2: number; 
    so2: number; 
    co2: number; 
  }
  
  class WaterSensorData implements IWaterSensorData {
    serialnumber: string = "";
    name: string = "";
    type: string = "";
    date: Date = new Date();
    location: string = "";
    latitude: number = 0;
    longitude: number = 0;
    pm10: number = 0;
    pm2_5: number = 0;
    temperature: number = 0;
    humidity: number = 0;
    pressure: number = 0;
    co: number = 0;
    no2: number = 0;
    so2: number = 0;
    co2: number = 0;
  
    constructor() {}
    parseData(obj: any): void {
      this.serialnumber = obj.serialnumber;
      this.name = obj.name;
      this.type = obj.type;
      this.date = new Date(obj.date); 
      this.location = obj.location;
      this.latitude = parseFloat(obj.latitude);
      this.longitude = Number(obj.longitude);
      this.pm10 = Number(obj.pm10);
      this.pm2_5 = Number(obj.pm2_5);
      this.temperature = Number(obj.temperature);
      this.humidity = Number(obj.humidity);
      this.pressure = Number(obj.pressure);
      this.co = Number(obj.co);
      this.no2 = Number(obj.no2);
      this.so2 = Number(obj.so2);
      this.co2 = Number(obj.co2);
    }
  
    printData(): void {
      console.log(`${new Date().toISOString()} Mensaje recibido en el sensor ${this.name}`);
      console.log(`Datos: Serial Number: ${this.serialnumber}, Name: ${this.name}, Type: ${this.type}, Date: ${this.date.toISOString()}, Location: ${this.location}, Latitude: ${this.latitude}, Longitude: ${this.longitude}, PM10: ${this.pm10}, PM2.5: ${this.pm2_5}, Temperature: ${this.temperature}, Humidity: ${this.humidity}, Pressure: ${this.pressure}, CO: ${this.co}, NO2: ${this.no2}, SO2: ${this.so2}, CO2: ${this.co2}`);
      console.log(`--------------------------------------------------`);
    }
  }
  
  export default WaterSensorData;
  