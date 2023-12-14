const express = require("express");
const PostModel = require("../models/PostModel");
const { authMiddleware } = require("../middlewares/auth");
const postRouter = express.Router();

// to get all posts
postRouter.get("/", async (req, res) => {
  const posts = await PostModel.find();
  res.send(posts);
});

// to get a particular post

postRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// create
postRouter.post("/add", authMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const post = await PostModel.create({
      ...payload,
      creator: req.userId,
      name: req.name,
    });
    await post.populate("creator");
    return res.status(201).send({ msg: "new article has been created", post });
  } catch (error) {
    res.send({ msg: "unable to create new article", error: error.message });
  }
});

module.exports = { postRouter };
