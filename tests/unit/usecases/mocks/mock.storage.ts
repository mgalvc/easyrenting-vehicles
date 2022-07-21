import IStorage from "../../../../src/adapters/storage/storage.interface";

export default class MockedStorage implements IStorage {
  addFile(buffer: Buffer, fileName: string): Promise<string> {
    return Promise.resolve('path')
  }
}