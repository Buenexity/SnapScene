
/*
const User = require("./users/users"); 

exports.getFollowers = async (req, res) => 
{
    try {
        const userEmail = req.params.UserEmail;
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ followers: user.followers });
    } catch (error) {
        console.error("Error fetching followers:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.getFollowing = async (req, res) => 
{
    try {
        const userEmail = req.params.UserEmail;
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ following: user.following });
    } catch (error) {
        console.error("Error fetching following:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



*/