import express from "express";
import {
  authUser,
  loginUser,
  logOutUser,
  signUpUser,
} from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logOutUser);

authRouter.get("/auth", requireAuth);

export default authRouter;
