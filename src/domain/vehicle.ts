import VehicleTooOld from "./exceptions/vehicleTooOld.exception"
import { v4 as uuidv4 } from "uuid"

type IVehicle = {
  ref?: string
  plate: string
  year: number
  brand: string
  model: string
  picture: string
}

export default class Vehicle {
  public ref?: string
  public plate: string
  public year: number
  public brand: string
  public model: string
  public picture: string

  public constructor(data: IVehicle) {
    this.ref = data.ref
    this.plate = data.plate
    this.year = data.year
    this.brand = data.brand
    this.model = data.model
    this.picture = data.picture
  }

  public validate() {
    const currentYear = new Date().getFullYear()
    if (currentYear - this.year > 2) throw new VehicleTooOld()
    return true
  }
}