import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      res.json(allUsers);
    }
  } catch (err) {
    res.status(400).send({ message: "Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { name, email, _id } = req.user;
    const token = req.token;
    const userData = {
      user: { name, email, _id },
      token,
    };
    if (userData) {
      res.json(userData);
    }
  } catch (err) {
    res.status(400).send({ message: "Error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await new User({
      name,
      email,
      password,
    });
    if (user) {
      const userToAdd = await user.save();
      if (userToAdd) {
        res.json(userToAdd);
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.json(user);
    }
  } catch (err) {
    res.status(400).send({ message: "Error" });
  }
};
