const express = require("express");
const _ = require("lodash");
const { Post, validatePost } = require("../models/post");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/my-posts", auth, async (req, res) => {
  const posts = await Post.find({ user_id: req.user._id });
  res.send(posts);
});

router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = await Post.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  post = await Post.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(post);
});

router.get("/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

router.get("/search/:search", async (req, res) => {
  const posts = await Post.find({
    $or: [
      { postSubject: new RegExp(req.params.search, "i") },
      { postTitle: new RegExp(req.params.search, "i") },
    ],
  });
  if (!posts) return res.status(404).send("No Posts Found");
  res.send(posts);
});

router.post("/", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req);
  let post = new Post({
    postTitle: req.body.postTitle,
    postSubject: req.body.postSubject,
    postMessage: req.body.postMessage,
    user_id: req.user._id,
  });
  post = await post.save();
  res.send(post);
});

router.get("/", async (req, res) => {
  posts = await Post.find({});
  res.send(posts);
});

module.exports = router;
