import express from "express";
import {
  getAllUsers,
  addUser,
  deleteUser,
  getUserDataByToken,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.get("/get-user-by-token", getUserDataByToken);

userRouter.delete("/:userId", deleteUser);

export default userRouter;
