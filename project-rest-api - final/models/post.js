const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },

  postSubject: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  postMessage: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2048,
  },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    postTitle: Joi.string().min(2).max(255).required(),
    postSubject: Joi.string().min(2).max(255).required(),
    postMessage: Joi.string().min(2).max(2048).required(),
  });

  return schema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;
