import { Request, Response } from "express";
import User from "../model/User";

export const signup = (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body as {
      email: string;
      password: number;
      confirmPassword: number;
    };

    const newUser = {
      email: email,
      password: password,
    };

    if (password !== confirmPassword) {
      res
        .status(402)
        .json({ message: "Make sure the passwords are matchinh! " });
      return;
    }
    const user = new User(newUser);
    user.save();
    res.status(201).json({ message: "User Created!" });
  } catch (err) {
    if (err instanceof Error) {
      console.log(`error happend while saving the user signup: ${err.message}`);
    } else {
      console.log("Something happend when trying to save user signup", err);
    }
  }
};
