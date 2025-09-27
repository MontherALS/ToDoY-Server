import express from "express";
import { signup } from "../controllers/authController";
import { signupRules, validate } from "../middleware/signupValidation";
const router = express.Router();

router.post("/signup", signupRules, validate, signup);

export default router;
