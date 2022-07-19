import DuplicatedPlate from "../../../src/usecases/exceptions/duplicatedPlate.exception"
import register from "../../../src/usecases/register"
import MockedRepo from "./mocks/mock.repository"

test('registers with success', async () => {
  const repo = new MockedRepo()
  const spy = jest.spyOn(repo, 'add')
  await register({
    brand: '',
    model: '',
    picture: '',
    plate: '',
    year: new Date().getFullYear()
  }, repo)
  expect(spy).toBeCalled()
})

test('error registering duplicated plate', async () => {
  const repo = new MockedRepo()
  await register({
    brand: '',
    model: '',
    picture: '',
    plate: '123',
    year: new Date().getFullYear()
  }, repo)

  try {
    await register({
      brand: '',
      model: '',
      picture: '',
      plate: '123',
      year: new Date().getFullYear()
    }, repo)
  } catch (error) {
    expect(error).toBeInstanceOf(DuplicatedPlate)
  }
})