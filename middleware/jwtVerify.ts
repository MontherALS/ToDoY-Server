import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

// expand Express req interface to include user (read about declaration merging) <:
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id?: string };
    }
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("token:", token);
  if (!token) return res.sendStatus(401);

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in .env");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (typeof decoded === "string") {
      return res.sendStatus(500);
    }

    console.log("decoded:", decoded);
    req.user = decoded;
    next();
  });
};

export default verifyJWT;
