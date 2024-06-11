export class MainData {
  serialnumber: string;
  type: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  date: string;

  constructor(
    serialnumber: string,
    type: string,
    name: string,
    location: string,
    latitude: number,
    longitude: number,
  ) {
    this.serialnumber = serialnumber;
    this.type = type;
    this.name = name;
    this.location = location;
    this.latitude = latitude;
    this.longitude = longitude;
    this.date= new Date().toString()
  }
}
