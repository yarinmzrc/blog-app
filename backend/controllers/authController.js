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
    if (err.code === 11000) {
      res.send(`${err.keyValue.email} already exists`);
    } else {
      res.send(err.message);
    }
  }
};

//'E11000 duplicate key error collection: blog-app.users index: email_1 dup key: { email: "yarin@test.com" }'

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user);
    res.status(200).send({ user, token });
  } catch (err) {
    res.send(err.message);
  }
};
