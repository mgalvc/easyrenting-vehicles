import IVehicleRepository from "../../../../src/adapters/repository/vehicleRepository.interface";
import Vehicle from "../../../../src/domain/vehicle";

export default class MockedRepo implements IVehicleRepository {
  private vehicles: Vehicle[] = []

  async add(vehicle: Vehicle): Promise<string> {
    const id = this.vehicles.push(vehicle)
    return `${id}`
  }

  async getByRef(ref: string): Promise<Vehicle | undefined> {
    return this.vehicles.find(v => v.ref === ref)
  }

  async getByPlate(plate: string): Promise<Vehicle | undefined> {
    return this.vehicles.find(v => v.plate === plate)
  }

  async list(): Promise<Vehicle[]> {
    return this.vehicles
  }
}