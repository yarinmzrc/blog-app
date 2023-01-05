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

export const getUserDataByToken = async (req, res) => {
  try {
    const bearerToken = req.headers["authorization"];
    if (bearerToken == undefined) {
      res.status(400).send("not required");
    }
    const token = bearerToken.split(" ")[1];
    const userDetails = await jwt.decode(token, process.env.JWT_SECRET);
    if (userDetails) {
      const userDetailsToSend = {
        user: { name: userDetails.user.name, email: userDetails.user.email },
        token,
      };
      res.json(userDetailsToSend);
    } else {
      res.status(401).send("Not Authorized");
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
