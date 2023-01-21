import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("userId", "name");
    if (allPosts) {
      res.json(allPosts);
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("userId", "name");
    const comments = await Comment.find({ postId }).populate("userId", "name");
    if (post && comments) {
      res.json({ post, comments });
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category }).populate("userId", "name");
    if (posts) {
      res.json(posts);
    } else {
      console.log(posts);
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, image, body, category, userId } = req.body;
    const post = await new Post({
      title,
      body,
      image,
      category,
      userId,
    });
    if (post) {
      const postToAdd = await post.save();
      if (postToAdd) {
        res.json(postToAdd);
      }
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, body, image } = req.body;
    const postToUpdate = await Post.findByIdAndUpdate(
      postId,
      { title, body, image, updatedAt: Date.now() },
      {
        new: true,
      }
    );
    if (postToUpdate) {
      res.json(postToUpdate);
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const getPostsById = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId });
    res.json(userPosts);
  } catch (err) {
    res.send(err.message);
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const { text } = req.body;
    const comment = await new Comment({
      text,
      userId,
      postId,
    });
    if (comment) {
      const commentToAdd = await comment.save();
      if (commentToAdd) {
        res.json(commentToAdd);
      }
    }
    return null;
  } catch (err) {
    res.send(err.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    if (post) {
      res.json(post);
    }
  } catch (err) {
    res.send(err.message);
  }
};
