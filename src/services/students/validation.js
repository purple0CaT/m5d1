import { body } from "express-validator";
//=
export const studentValidationMiddleware = [
  body("name").exists().notEmpty().withMessage("Name is mandatory"),
  body("age").exists().notEmpty().withMessage("Age is mandatory"),
];
