import IVehicleRepository from "../adapters/repository/vehicleRepository.interface";
import Vehicle from "../domain/vehicle";
import DuplicatedPlate from "./exceptions/duplicatedPlate.exception";
import { VehicleDTO } from "./vehicle.dto";

export default async function register(data: VehicleDTO, repo: IVehicleRepository): Promise<string> {
  const vehicle = new Vehicle({ 
    brand: data.brand, 
    model: data.model, 
    picture: data.picture, 
    plate: data.plate, 
    year: data.year
  })

  vehicle.validate()
  const vehicleWithSamePlate = await repo.getByPlate(data.plate)
  if (vehicleWithSamePlate) throw new DuplicatedPlate()
  const id = await repo.add(vehicle)
  return id
}