import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const taskRules = check("name")
  .notEmpty()
  .withMessage("Task name is required");

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
