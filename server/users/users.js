const mongoose = require("mongoose");

//image schema to house url with comments
const imageSchema = new mongoose.Schema(
{
    url: { type: String, required: true },
    comments: [{ type: String }],
    tags: [String]
});



const userSchema = new mongoose.Schema(
{
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, unique: true },
    profile: {type: String},
    images: [imageSchema] //array of images
});

// Define User model
const User = mongoose.model('User', userSchema);

module.exports = User;
