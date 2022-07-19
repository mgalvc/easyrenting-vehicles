import Vehicle from "../../domain/vehicle";

export default interface IVehicleRepository {
  add(vehicle: Vehicle): Promise<string>
  getByRef(ref: string): Promise<Vehicle | undefined>
  getByPlate(plate: string): Promise<Vehicle | undefined>
  list(): Promise<Vehicle[]>
}