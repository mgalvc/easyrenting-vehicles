export default interface IStorage {
  addFile(buffer: Buffer, fileName: string): Promise<string>
}