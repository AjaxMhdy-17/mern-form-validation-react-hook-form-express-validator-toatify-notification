const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: false,
      },
    },
  ],
  date: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("post", postSchema);
