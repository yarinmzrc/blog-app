import express from "express";
import {
  getAllPosts,
  addPost,
  deletePost,
  getPostById,
} from "../controllers/postController.js";
const postRouter = express.Router();

postRouter.get("/", getAllPosts);

postRouter.get("/:postId", getPostById);

postRouter.post("/", addPost);

postRouter.delete("/:postId", deletePost);

export default postRouter;
