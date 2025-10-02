import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

import { taskRules, validateTask } from "../middleware/taskValidation";

const router = express.Router();

router.post("/:userId", taskRules, validateTask, createTask);
router.get("/tasks/:userId", getTasks);

router.get("/:taskId", getTaskById);
router.put("/:taskId", taskRules, validateTask, updateTask);
router.delete("/:taskId", deleteTask);

export default router;
