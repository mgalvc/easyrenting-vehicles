export default class VehicleTooOld extends Error {
  constructor() {
    super('This vehicle is too old')
    Object.setPrototypeOf(this, VehicleTooOld.prototype)
  }
}