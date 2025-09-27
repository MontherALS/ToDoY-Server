import { Request, Response } from "express";
import User from "../model/User";
export const signup = async (req: Request, res: Response) => {
  //Todo Add bycript
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

    const user = new User(newUser);
    await user.save();
    res.status(201).json({ message: "User Created!" });
  } catch (err) {
    if (err instanceof Error) {
      console.log(`error happend while saving the user signup: ${err.message}`);
    } else {
      console.log("Something happend when trying to save user signup", err);
    }
  }
};
