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

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happend withle getting tasks:", err.message);
      return res.status(404).json({ message: "Server Error" });
    }
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happend withle getting task:", err.message);
      return res.status(404).json({ message: "Server Error" });
    }
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { name, due } = req.body as {
      name: string;
      due: Date;
    };
    const updatedTask = {
      name: name,
      due: due,
    };

    const task = await Task.findByIdAndUpdate(taskId, updatedTask, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(201)
      .json({ message: "Task updated successfully", task: task });
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happend withle updating task:", err.message);

      return res.status(404).json({ message: "Server Error" });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task Deleted!" });
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happend withle deleting task:", err.message);
      return res.status(404).json({ message: "Server Error" });
    }
  }
};
