import { body } from "express-validator";

export default [
  body('brand').notEmpty(),
  body('model').notEmpty(),
  body('picture').notEmpty(),
  body('plate').notEmpty(),
  body('year').isNumeric()
]