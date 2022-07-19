export default class DuplicatedPlate extends Error {
  constructor() {
    super('There is a car registered with this plate')
    Object.setPrototypeOf(this, DuplicatedPlate.prototype)
  }
}