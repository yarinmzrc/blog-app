import Post from "../models/Post.js";

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
    if (post) {
      res.json(post);
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category });
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
    const { title, body, category, userId } = req.body;
    const post = await new Post({
      title,
      body,
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
