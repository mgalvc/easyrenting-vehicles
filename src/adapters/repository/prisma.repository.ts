import { PrismaClient } from "@prisma/client";
import Vehicle from "../../domain/vehicle";
import IVehicleRepository from "./vehicleRepository.interface";

// TODO remove repeated calls to $connect and $disconnect
// TODO write mappers domain <-> schema
export default class PrismaRepository implements IVehicleRepository {
  private connection: PrismaClient

  public constructor() {
    this.connection = new PrismaClient()
  }

  async add(vehicle: Vehicle): Promise<string> {
    await this.connection.$connect()
    const created = await this.connection.vehicle.create({
      data: {
        brand: vehicle.brand,
        model: vehicle.model,
        picture: vehicle.picture,
        plate: vehicle.plate,
        year: `${vehicle.year}`
      }
    })
    this.connection.$disconnect()
    return created.id
  }

  async getByRef(ref: string): Promise<Vehicle | undefined> {
    await this.connection.$connect()
    const vehicle = await this.connection.vehicle.findUnique({
      where: { id: ref }
    })

    this.connection.$disconnect()

    if (!vehicle) return undefined

    return new Vehicle({
      ref: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      picture: vehicle.picture,
      plate: vehicle.plate,
      year: parseInt(vehicle.year)
    })
  }

  async getByPlate(plate: string): Promise<Vehicle | undefined> {
    await this.connection.$connect()
    const vehicle = await this.connection.vehicle.findUnique({
      where: { plate: plate }
    })

    this.connection.$disconnect()

    if (!vehicle) return undefined

    return new Vehicle({
      ref: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      picture: vehicle.picture,
      plate: vehicle.plate,
      year: parseInt(vehicle.year)
    })
  }

  async list(): Promise<Vehicle[]> {
    await this.connection.$connect()
    const all = await this.connection.vehicle.findMany()
    this.connection.$disconnect()
    return all.map(v => new Vehicle({ ...v, ref: v.id, year: parseInt(v.year) }))
  }
}