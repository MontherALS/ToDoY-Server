import express from "express";
import { signup, login } from "../controllers/authController";
import { signupRules, validate } from "../middleware/signupValidation";
const router = express.Router();

router.post("/signup", signupRules, validate, signup);
router.post("/login", login);
export default router;
