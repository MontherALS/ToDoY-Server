import { Request, Response } from "express";
import User from "../model/User";
export const signup = async (req: Request, res: Response) => {
  //Todo Add bycript
  try {
    const { email, password, confirmPassword } = req.body as {
      email: string;
      password: string;
      confirmPassword: string;
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "no user regester in this email" });
    }
    if (user.password !== password) {
      //TODO compare by bycript later

      return res.status(400).json({ message: "Wrong password or email" });
    }
    return res.status(200).json({ message: " log in succses ", user: user });
    //TODO LATER ADD JWT
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happend withle creating task:", err.message);
      return res.status(404).json({ message: "Server Error" });
    }
  }
};
