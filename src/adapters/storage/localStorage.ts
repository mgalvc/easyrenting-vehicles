import { writeFileSync } from "fs";
import IStorage from "./storage.interface";

export default class LocalStorage implements IStorage {
  addFile(buffer: Buffer, fileName: string): Promise<string> {
    const path = `/Users/matheus.correia/Projects/Personal/renting-app/vehicles/public/${fileName}.png`
    writeFileSync(path, buffer)
    return Promise.resolve(path)
  }
}