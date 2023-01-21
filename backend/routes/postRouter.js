import express from "express";
import {
  getAllPosts,
  addPost,
  deletePost,
  getPostById,
  getPostsByCategory,
  updatePost,
  getPostsById,
  addComment,
} from "../controllers/postController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const postRouter = express.Router();

postRouter.get("/", getAllPosts);

postRouter.get("/:postId", getPostById);

postRouter.get("/get-posts-by-category/:category", getPostsByCategory);

postRouter.get("/get-posts-by-user-id/:userId", getPostsById);

postRouter.post("/", requireAuth, addPost);

postRouter.post("/edit/:postId", requireAuth, updatePost);

postRouter.post("/add-comment/:userId/:postId", requireAuth, addComment);

postRouter.delete("/:postId", requireAuth, deletePost);

export default postRouter;
