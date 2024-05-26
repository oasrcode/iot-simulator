export class MainData {
  id: number;
  type: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  date: string;

  constructor(
    id: number,
    type: string,
    name: string,
    location: string,
    latitude: number,
    longitude: number,
  ) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.location = location;
    this.latitude = latitude;
    this.longitude = longitude;
    this.date= new Date().toString()
  }
}
