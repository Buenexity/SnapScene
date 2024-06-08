const express = require('express');
const router = express.Router();
const User = require('../users/users');

// POST /follow/:userId
router.post("/follow/:userId", async (req, res) => 
    {
      try {
        const userId = req.params.userId;
        const userToFollowId = req.body.userToFollowId;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        const userToFollow = await User.findById(userToFollowId);
        if (!userToFollow) {
          return res.status(404).json({ error: "User to follow not found" });
        }
    
        if (user.following.includes(userToFollowId)) {
          return res.status(400).json({ error: "Already following this user" });
        }
    
        user.following.push(userToFollowId);
        await user.save();
    
        userToFollow.followers.push(userId);
        await userToFollow.save();
    
        return res.status(200).json({ message: "User followed successfully" });
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  

router.get("/followers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user
    const user = await User.findById(userId).populate("followers", "username");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ followers: user.followers });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /following/:userId
router.get("/following/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user
    const user = await User.findById(userId).populate("following", "username");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ following: user.following });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
