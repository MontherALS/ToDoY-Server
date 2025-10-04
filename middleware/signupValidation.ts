import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

import User from "../model/User";

export const signupRules = [
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error(
          "This email is being used try diffrent one or try to login"
        );
      }
      return true;
    }),

  check("password")
    .isStrongPassword({ minLength: 6 })
    .withMessage(
      "Password must be at least 6 characters and include symbols, numbers, and UpperCase letters"
    ),

  check("confirmPassword")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Make sure the passwords are matching!");
      }
      return true;
    }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
};
