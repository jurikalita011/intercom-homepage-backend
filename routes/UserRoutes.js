const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.send({
        message: "User already exists, please login",
        auth: false,
      });
    }
    bcrypt.hash(password, 7, async (err, hash) => {
      if (err) {
        res.json({ err: err.message });
      } else {
        const user = new UserModel({ ...req.body, password: hash });
        await user.save();
        res.send({
          message: "User has been Registered successfully",
          auth: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.send({ message: "User not found", auth: false });
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.send({ message: "Incorrect Password", auth: false });
    }
    const token = jwt.sign(
      { userId: user._id, user: user.name },
      process.env.secretKey,
      {
        expiresIn: "7d",
      }
    );
    res.send({ message: "Login successful", token, user, auth: true });
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = {
  userRouter,
};
