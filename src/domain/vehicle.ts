import VehicleTooOld from "./exceptions/vehicleTooOld.exception"

type IVehicle = {
  ref?: string
  plate: string
  year: number
  brand: string
  model: string
  picture: string
  createdAt?: Date
  updatedAt?: Date
}

export default class Vehicle {
  public ref?: string
  public plate: string
  public year: number
  public brand: string
  public model: string
  public picture: string
  public readonly createdAt: Date
  public readonly updatedAt: Date

  public constructor(data: IVehicle) {
    this.ref = data.ref
    this.plate = data.plate
    this.year = data.year
    this.brand = data.brand
    this.model = data.model
    this.picture = data.picture
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  public validate() {
    const currentYear = new Date().getFullYear()
    if (currentYear - this.year > 2) throw new VehicleTooOld()
    return true
  }
}