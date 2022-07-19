import Vehicle from "../../../src/domain/vehicle"
import list from "../../../src/usecases/list"
import MockedRepo from "./mocks/mock.repository"

test('list vehicles', async () => {
  const repo = new MockedRepo()
  await Promise.all([
    repo.add(new Vehicle({
      brand: 'Ford',
      model: 'Ranger',
      picture: '',
      plate: 'ABC-123',
      year: 2022
    })),
    repo.add(new Vehicle({
      brand: 'Honda',
      model: 'Civic',
      picture: '',
      plate: 'DEF-123',
      year: 2022
    })),
    repo.add(new Vehicle({
      brand: 'Chevrolet',
      model: 'Camaro',
      picture: '',
      plate: 'GHI-123',
      year: 2022
    }))
  ])
  const vehicles = await list(repo)
  expect(vehicles).toHaveLength(3)
})