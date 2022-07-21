import { randomUUID } from "crypto";
import IVehicleRepository from "../adapters/repository/vehicleRepository.interface";
import IStorage from "../adapters/storage/storage.interface";
import Vehicle from "../domain/vehicle";
import DuplicatedPlate from "./exceptions/duplicatedPlate.exception";
import { VehicleDTO } from "./vehicle.dto";

export default async function register(data: VehicleDTO, repo: IVehicleRepository, storage: IStorage): Promise<string> {
  const vehicle = new Vehicle({ 
    brand: data.brand, 
    model: data.model, 
    plate: data.plate, 
    year: data.year,
    picture: ''
  })

  vehicle.validate()
  
  const vehicleWithSamePlate = await repo.getByPlate(data.plate)
  if (vehicleWithSamePlate) throw new DuplicatedPlate()
  
  vehicle.picture = await storage.addFile(data.pictureBuffer, randomUUID())
  
  const id = await repo.add(vehicle)
  return id
}