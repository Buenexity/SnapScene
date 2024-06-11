const mongoose = require("mongoose");


//image schema to house url with comments
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  comments: [{ type: String }],
  tags: [String],
  title: { type: String, required: true },
  Date: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String},
  username: { type: String, unique: true },
  profile: { type: String,     default: "CS110-Project-SnapScene/frontend/public/default_pfp.webp"},
  images: [imageSchema],
  followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

// Define User model
const User = mongoose.model("User", userSchema);

module.exports = User;
