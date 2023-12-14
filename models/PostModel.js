const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    img: { type: String },
    title: { type: String },
    body: { type: String },
    tags: { type: [String] },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);
const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
