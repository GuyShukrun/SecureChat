const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
//CRUD

router.post("/register", async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPass,
      profilePicture: req.body.profilePicture,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update profile picture
router.put("/profilePicture/:id", async (req, res) => {
  try {
  } catch (error) {}
  const user = await User.findByIdAndUpdate(req.body.userId, {
    $set: { profilePicture: req.body.profilePicture },
  });
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Password don't match");

    // Valid email and password
    const {
      password,
      updatedAt,
      createdAt,
      email,
      friends,
      isAdmin,
      isOnline,
      ...other
    } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ fullname: username });
    const {
      password,
      updatedAt,
      createdAt,
      email,
      friends,
      isAdmin,
      isOnline,
      ...other
    } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update user

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // update password
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json(`Account has been updated`);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your acount!");
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.body.userId);
      res.status(200).json(`Account has been deleted`);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// Get all users that their full name start with..
router.get("/search/:name", async (req, res) => {
  try {
    const users = await User.find({
      fullname: { $regex: `^${req.params.name}`, $options: "i" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(err);
  }
});
module.exports = router;
