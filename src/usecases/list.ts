import IVehicleRepository from "../adapters/repository/vehicleRepository.interface";

export default function list(repo: IVehicleRepository) {
  return repo.list()
}