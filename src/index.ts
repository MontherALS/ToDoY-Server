import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import auth from "../router/auth";

const app = express();

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.DBURL;
app.use(express.json());

app.use("/auth", auth);

if (!dbUrl) throw new Error("DBURL is not defined in .env");
mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });
