import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "../router/auth";
import task from "../router/task";
dotenv.config();

const PORT = process.env.PORT || 5000;

const dbUrl = process.env.DBURL;

const app = express();

app.use(express.json());

app.use("/auth", auth);

app.use("/task", task);

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
