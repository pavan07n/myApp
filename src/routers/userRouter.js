const express = require("express");
const router = new express.Router();
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");
const bcrypt = require("bcryptjs");

//Create user
router.post("/users/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already exists");

  const newUser = new User(req.body);
  try {
    const payload = {
      id: newUser._id,
      username: newUser.username,
    };

    await newUser.save();
    const token = await newUser.generateAuthToken(payload);
    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    //Invalid user
    if (!user)
      return res.status(401).send("Unable to login, check credentials");

    //InValid password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(401).send("Unable to login, check credentials");

    //Valid user
    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = await user.generateAuthToken(payload);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetch authenticated user
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//Update user
router.patch("/users/me/update", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["fullName", "username", "password"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) return res.status(400).send({ Error: "Invalid update" });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete user
router.delete("/users/me/delete", auth, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
