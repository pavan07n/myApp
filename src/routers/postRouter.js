const express = require("express");
const router = new express.Router();
const Post = require("../models/post.js");
const auth = require("../middleware/auth.js");

//Posts CRUD Operations

// Create a post
router.post("/posts", auth, async (req, res) => {
  // const post = new Post(req.body);
  const post = new Post({
    ...req.body,
    createdBy: req.user._id,
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Fetch all posts
router.get("/posts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id });
    if (!posts) return res.status(404).send("Post not found");
    res.send(posts);
  } catch (error) {
    res.status(500).send();
  }
});

//Fetch a specific post
router.get("/posts/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findOne({ _id, createdBy: req.user._id });
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send();
  }
});

//Update a post
router.patch("/posts/:id", auth, async (req, res) => {
  //Check if the update user wants to update is allowed
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "body", "active", "location"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) return res.status(400).send({ error: "Invalid update" });

  try {
    // const post = await Post.findById(req.params.id);
    const post = await Post.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!post) return res.status(404).send("Post not found");

    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete a post
router.delete("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!post) return res.status(404).send("Post not found");

    res.send(post);
  } catch (error) {
    res.status(500).send();
  }
});

// API to retrieve counts of active and inactive posts
router.get("/postCounts", auth, async (req, res) => {
  try {
    const activeCount = await Post.countDocuments({
      active: true,
      createdBy: req.user._id,
    });
    const inactiveCount = await Post.countDocuments({
      active: false,
      createdBy: req.user._id,
    });
    res.json({ activeCount, inactiveCount });
  } catch (error) {
    res.status(500).send(error);
  }
});

//API End point to retrive posts with latitude and longitude
router.get("/posts/:longitude/:latitude", auth, async (req, res) => {
  const { longitude, latitude } = req.params;
  try {
    const posts = await Post.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 0,
          $minDistance: 0,
        },
      },
      createdBy: req.user._id,
    });
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
