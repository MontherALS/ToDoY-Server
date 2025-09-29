import express from "express";
import { createTask } from "../controllers/taskController";
const router = express.Router();

router.post("/:userId", createTask);
router.get("/:userId", () => {});
router.put("/:taskId", () => {});
router.delete("/:taskId", () => {});

export default router;
