import { Request, Response } from "express";
import Task from "../model/Task";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, due } = req.body as {
      name: string;
      due: Date;
    };
    const newTask = {
      name: name,
      due: due,
      user: userId,
    };

    const task = new Task(newTask);
    await task.save();

    res.status(201).json({ message: "Task Created!" });
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happend withle creating task:", err.message);
      return res.status(404).json({ message: "Server Error" });
    }
  }
};
