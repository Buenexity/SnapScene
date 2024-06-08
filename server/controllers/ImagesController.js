const express = require('express');
const router = express.Router();
const User = require('../users/users'); 

router.get("/get_profile_imageposts/:UserEmail", async (req, res) => 
{
    const userEmail = req.params.UserEmail;
    
    try {
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ Allimages: user.images });
    } catch (error) {
        console.error("Error fetching user images:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
