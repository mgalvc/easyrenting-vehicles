import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from "cors"
import InMemory from "../../adapters/repository/inMemory";
import VehicleTooOld from "../../domain/exceptions/vehicleTooOld.exception";
import DuplicatedPlate from "../../usecases/exceptions/duplicatedPlate.exception";
import register from "../../usecases/register";
import list from "../../usecases/list";
import validatorMiddleware from "./middlewares/validator.middleware";
import vehicleValidator from "./validators/vehicle.validator";
import env from '../../config/env';
import PrismaRepository from '../../adapters/repository/prisma.repository';

const app = express()

app.use(express.json())
app.use(cors())

app.get('/healthcheck', (req, res) => {
  res.send({ healthy: true })
})

app.post(
  '/register', 
  vehicleValidator,
  validatorMiddleware,
  async (req: Request, res: Response) => {
    // const repo = new InMemory()
    const repo = new PrismaRepository()
    const { body } = req

    try {
      const ref = await register({
        brand: body.brand,
        model: body.model,
        picture: body.picture,
        plate: body.plate,
        year: body.year
      }, repo)
      
      res.send({ ref })
    } catch (error) {
      if (error instanceof DuplicatedPlate) {
        return res.status(409).json({ error: error.message })
      }

      if (error instanceof VehicleTooOld) {
        return res.status(400).json({ error: error.message })
      }

      return res.status(500).json({ error })
    }
    
  }
)

app.get('/vehicles', async (req: Request, res: Response) => {
  // const repo = new InMemory()
  const repo = new PrismaRepository()
  return res.send(await list(repo))
})

app.listen(env.PORT, () => console.log(`Listening at ${env.PORT}`))