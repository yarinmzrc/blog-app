import express from "express";
import {
  getAllPosts,
  addPost,
  deletePost,
} from "../controllers/postController.js";
const postRouter = express.Router();

postRouter.get("/", getAllPosts);

postRouter.post("/", addPost);

postRouter.delete("/:postId", deletePost);

export default postRouter;
