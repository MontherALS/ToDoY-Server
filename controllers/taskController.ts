import { Request, Response } from "express";
import Task from "../model/Task";

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { name, dueDate, priority } = req.body as {
      name: string;
      dueDate: string;
      priority: "low" | "medium" | "high";
    };

    const newTask = {
      name: name,
      dueDate: dueDate,
      priority: priority,
      user: userId,
    };

    console.log("Creating task for user:", newTask);
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
    const userId = req.user?.id;
    console.log("Fetching tasks for user:", userId);
    const tasks = await Task.find({ user: userId });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }
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
    const completed = req.body.completed as Boolean;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { completed: completed },
      { new: true }
    );
    console.log("updated ", task);
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
