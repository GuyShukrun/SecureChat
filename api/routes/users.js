const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
//CRUD

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/register", upload.single("profileImg"), async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host"); // url for the website
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const profilePictureUrl = req.file ? req.file.filename : "noAvatar.png";
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPass,
      profilePicture: profilePictureUrl,
    });
    console.log(newUser);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Password don't match");

    // Valid email and password
    res.status(200).json(user);
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
    const { password, updatedAt, ...other } = user._doc;
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
// friend a user
router.put("/:id/friend", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFriend = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userToFriend.friends.includes(req.body.userId)) {
        await userToFriend.updateOne({ $push: { friends: req.body.userId } });
        await currentUser.updateOne({ $push: { friends: req.params.id } });
        res.status(200).json("Now friends!");
      } else {
        res.status(403).json("You are already friends");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't friend yourself!");
  }
});

// Unfriend a user
router.put("/:id/unfriend", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToUnfriend = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userToUnfriend.friends.includes(req.body.userId)) {
        res.status(403).json("You are not friends");
      } else {
        await userToUnfriend.updateOne({ $pull: { friends: req.body.userId } });
        await currentUser.updateOne({ $pull: { friends: req.params.id } });
        res.status(200).json("Unfriend succefully");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfriend yourself!");
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
