import express from "express";
import {
  loginUser,
  logOutUser,
  signUpUser,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logOutUser);

export default authRouter;
