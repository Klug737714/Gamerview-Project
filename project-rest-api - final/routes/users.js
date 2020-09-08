const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validatePosts } = require("../models/user");
const { Post } = require("../models/post");
const auth = require("../middleware/auth");
const router = express.Router();

const getPosts = async (postsArray) => {
  const posts = await Post.find({ id: { $in: postsArray } });
  return posts;
};
router.get("/favorited", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const posts = await Post.find({ _id: user.favorites });
  res.send(posts);
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.send(user);
});

router.get("/posts", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");

  let data = {};
  data.posts = req.query.numbers.split(",");

  const posts = await getPosts(data.posts);
  res.send(posts);
});

router.patch("/posts", auth, async (req, res) => {
  const { error } = validatePosts(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const posts = await getPosts(req.body.posts);
  if (posts.length != req.body.posts.length)
    res.status(400).send("Post numbers don't match");

  let user = await User.findById(req.user._id);
  user.posts = req.body.posts;
  user = await user.save();
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "posts"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});
router.put("/favorite/:postid", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (user.favorites.includes(req.params.postid)) {
    user.favorites.splice(user.favorites.indexOf(req.params.postid), 1);
  } else {
    user.favorites.push(req.params.postid);
  }
  await user.save();
  res.send(user);
});
module.exports = router;
