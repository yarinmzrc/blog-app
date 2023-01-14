import express from "express";
import {
  getAllPosts,
  addPost,
  deletePost,
  getPostById,
  getPostsByCategory,
  updatePost,
} from "../controllers/postController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const postRouter = express.Router();

postRouter.get("/", getAllPosts);

postRouter.get("/:postId", getPostById);

postRouter.get("/get-posts-by-category/:category", getPostsByCategory);

postRouter.post("/", requireAuth, addPost);

postRouter.post("/edit/:postId", requireAuth, updatePost);

postRouter.delete("/:postId", requireAuth, deletePost);

export default postRouter;
