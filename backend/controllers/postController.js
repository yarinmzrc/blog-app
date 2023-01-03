import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (allPosts) {
      res.json(allPosts);
    }
  } catch (err) {
    res.status(400).send({ message: "Error" });
  }
};

export const addPost = async (req, res) => {
  try {
    const { name, email } = req.body;
    const post = await new Post({
      name,
      email,
    });
    if (post) {
      const postToAdd = await post.save();
      if (postToAdd) {
        res.json(postToAdd);
      }
    }
  } catch (err) {
    res.status(400).send({ message: "Error" });
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
    res.status(400).send({ message: "Error" });
  }
};
