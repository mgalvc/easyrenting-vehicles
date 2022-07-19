import VehicleTooOld from "../../../src/domain/exceptions/vehicleTooOld.exception"
import Vehicle from "../../../src/domain/vehicle"

test('creates a valid vehicle', () => {
  const vehicle = new Vehicle({
    ref: '',
    brand: '',
    model: '',
    picture: '',
    plate: '',
    year: new Date().getFullYear()
  })
  expect(vehicle.validate()).toBeTruthy()
})

test('too old vehicle', () => {
  const vehicle = new Vehicle({
    ref: '',
    brand: '',
    model: '',
    picture: '',
    plate: '',
    year: new Date().getFullYear() - 3
  })
  expect(() => vehicle.validate()).toThrow(VehicleTooOld)
})