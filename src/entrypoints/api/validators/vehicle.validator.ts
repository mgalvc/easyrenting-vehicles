import { body } from "express-validator";

export default [
  body('brand').notEmpty(),
  body('model').notEmpty(),
  body('plate').notEmpty(),
  body('year').isNumeric()
]