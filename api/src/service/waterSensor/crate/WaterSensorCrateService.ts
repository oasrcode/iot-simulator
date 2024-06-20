import WaterSensorData from "../../../models/WaterSensorData";
import IWaterSensorCrateRepository from "../../../repository/waterSensor/crate/IWaterSensorCrateRepository";



class WaterSensorCrateService implements IWaterSensorCrateRepository  {

  private _waterSensorCrateRepository:IWaterSensorCrateRepository

  constructor(waterSensorCrateRepository:IWaterSensorCrateRepository){
    this._waterSensorCrateRepository=waterSensorCrateRepository;
  }
  async postWaterSensorData(data: WaterSensorData): Promise<void> {
    await  await this._waterSensorCrateRepository.postWaterSensorData(data)
  }
 
  
 
 
}

export default WaterSensorCrateService;
