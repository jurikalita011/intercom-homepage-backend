const mongoose = require("mongoose");

const helpSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  total: {
    type: String,
  },
});

const Post = mongoose.model("help", helpSchema);

module.exports = Post;
