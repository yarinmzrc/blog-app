import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const maxAge = 3 * 24 * 60 * 60 * 2;

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user);
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const logOutUser = async (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

export const authUser = async (req, res) => {
  console.log(req.cookies.token);
};
