import express from "express";
import {
  getAllUsers,
  addUser,
  deleteUser,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.delete("/:userId", deleteUser);

export default userRouter;
