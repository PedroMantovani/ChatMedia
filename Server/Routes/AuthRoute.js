import express from "express";
import { loginUer, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUer);

export default router;
