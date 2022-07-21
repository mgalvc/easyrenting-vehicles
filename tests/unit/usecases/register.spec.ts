import DuplicatedPlate from "../../../src/usecases/exceptions/duplicatedPlate.exception"
import register from "../../../src/usecases/register"
import MockedRepo from "./mocks/mock.repository"
import MockedStorage from "./mocks/mock.storage"

test('registers with success', async () => {
  const repo = new MockedRepo()
  const storage = new MockedStorage()
  const spy = jest.spyOn(repo, 'add')
  await register({
    brand: '',
    model: '',
    pictureBuffer: Buffer.from(''),
    plate: '',
    year: new Date().getFullYear()
  }, repo, storage)
  expect(spy).toBeCalled()
})

test('error registering duplicated plate', async () => {
  const repo = new MockedRepo()
  const storage = new MockedStorage()
  await register({
    brand: '',
    model: '',
    pictureBuffer: Buffer.from(''),
    plate: '123',
    year: new Date().getFullYear()
  }, repo, storage)

  try {
    await register({
      brand: '',
      model: '',
      pictureBuffer: Buffer.from(''),
      plate: '123',
      year: new Date().getFullYear()
    }, repo, storage)
  } catch (error) {
    expect(error).toBeInstanceOf(DuplicatedPlate)
  }
})