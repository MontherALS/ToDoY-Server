import { Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response) => {

  try {
    const { email, password, confirmPassword } = req.body as {
      email: string;
      password: string;
      confirmPassword: string;
    };

    const hshPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email: email,
      password: hshPassword,
    };

    const user = new User(newUser);
console.log(user);
    await user.save();

    res.status(201).json({ message: "User Created!" ,user:user});
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
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(404).json({ message: "email or password is not correct" });
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
