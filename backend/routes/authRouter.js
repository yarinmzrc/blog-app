import express from "express";
import { loginUser, signUpUser } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpUser);

authRouter.post("/login", loginUser);

authRouter.get("/auth", requireAuth);

export default authRouter;
