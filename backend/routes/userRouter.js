import express from "express";
import {
  getAllUsers,
  addUser,
  deleteUser,
  getUser,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.get("/get-user", getUser);

userRouter.delete("/:userId", deleteUser);

export default userRouter;
