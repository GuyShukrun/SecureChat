const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
