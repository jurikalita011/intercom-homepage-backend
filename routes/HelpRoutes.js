const express = require("express");
const HelpModel = require("../models/HelpModel");

const helpRouter = express.Router();

// to get all posts
helpRouter.get("/", async (req, res) => {
  const posts = await HelpModel.find();
  res.send(posts);
});

// create
helpRouter.post("/add", async (req, res) => {
  try {
    const { title, body, total } = req.body;
    const post = await HelpModel.create(req.body);
    res.status(200).send({ msg: "new info has been added", article: post });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { helpRouter };
