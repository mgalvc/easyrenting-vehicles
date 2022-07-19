import Vehicle from "../../domain/vehicle";
import IVehicleRepository from "./vehicleRepository.interface";

export default class InMemory implements IVehicleRepository {
  public static vehicles: Vehicle[] = []

  async add(vehicle: Vehicle): Promise<string> {
    const length = InMemory.vehicles.push(vehicle)
    return `${length-1}`
  }

  async getByRef(ref: string): Promise<Vehicle | undefined> {
    return InMemory.vehicles.find(v => v.ref === ref)
  }

  async getByPlate(plate: string): Promise<Vehicle | undefined> {
    return InMemory.vehicles.find(v => v.plate === plate)
  }

  async list(): Promise<Vehicle[]> {
    return InMemory.vehicles
  }

}