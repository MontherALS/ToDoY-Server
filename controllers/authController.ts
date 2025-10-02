import { Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const hshPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email: email,
      password: hshPassword,
    };

    const user = new User(newUser);
    console.log(user);
    await user.save();

    res.status(201).json({ message: "User Created!", user: user });
  } catch (err) {
    if (err instanceof Error) {
      console.log(
        `error happened while saving the user signup: ${err.message}`
      );
      return res
        .status(404)
        .json({ message: "Server Error", error: err.message });
    } else {
      console.log("Something happened when trying to save user signup", err);
      return res.status(404).json({ message: "Server Error" });
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
        .json({ message: "no user registered with this email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "email or password is not correct" });
    }
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in .env");

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    return res.status(200).json({
      token: token,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happened while login:", err.message);
      return res
        .status(404)
        .json({ message: "Server Error", error: err.message });
    }
  }
};
