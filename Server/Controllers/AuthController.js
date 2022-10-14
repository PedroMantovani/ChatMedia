import UserModel from "../Models/UserModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Regsiter a new user
export const registerUser = async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (user) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPass;

    const newUser = new UserModel(req.body);

    try {
      const user = await newUser.save();
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const loginUer = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWt_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not exists");
    }
  } catch (error) {}
};
