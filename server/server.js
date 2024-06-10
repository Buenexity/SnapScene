const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./users/users"); 
const followController = require("./controllers/followerController");
const ImageController = require("./controllers/ImagesController");

const bodyParser = require("body-parser");
const router = express.Router();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

///////////////////////////////////////////////////

// GET request to retrieve a user's ID by email
app.get("/user/id/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error("Error fetching user's ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//////////////////////////////////////////////////////

//token generator key
const SECRET_KEY = "kC^nU$mD*UL@Zuam";

//for testing purposes you change this to your data base
const mongoURI =
  "mongodb+srv://CS110-Group15:Password24@snapscene.nfeeo7g.mongodb.net/users";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/signup", async (req, res) => {
  console.log("Received data:", req.body);
  const { email, password, username } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide email" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (username && (await User.findOne({ username }))) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ email, password, username });
    await newUser.save();

    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Need email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

app.post("/createwithGoogle", async (req, res) => {
  console.log("Received data:", req.body);
  const { email, password, username } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide email" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (username && (await User.findOne({ username }))) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ email, username });
    await newUser.save();

    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/signwithGoogle", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required for Google sign-in" });
  }

  try {
    const user = await User.findOne({ email });

    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    if (user) {
      res
        .status(200)
        .json({
          message: "Google sign-in successful",
          user: { email: user.email, username: user.username },
          token,
        });
    }
  } catch (err) {
    console.error("Error during Google sign-in:", err);
    res.status(500).json({ message: "Error during Google sign-in" });
  }
});

/*
    Image retrieval
*/
app.post("/update_profile_picture/:UserEmail", async (req, res) => {
  try {
    const userEmail = req.params.UserEmail;
    const imageUrl = req.body.imageUrl;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the profile picture URL
    user.profile = imageUrl;

    // Save the changes to the database
    await user.save();

    return res
      .status(200)
      .json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addImage/:UserEmail", async (req, res) => {
  const userEmail = req.params.UserEmail;
  const imagePost = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.images.push(imagePost); //push to array
    await user.save();

    return res
      .status(200)
      .json({ message: "Image added successfully", image: imagePost });
  } catch (error) {
    console.error("Error adding image:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get_profile_picture/:UserEmail", async (req, res) => {
  try {
    const userEmail = req.params.UserEmail;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(405).json({ error: "User not found" });
    }

    return res.status(200).json({ imageUrl: user.profile });
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const user = await User.findOne(
      { "images._id": req.params.id }, 
      { "images.$": 1}
    );

    if (user) {
      res.json(user.images[0]);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post("/posts/:id/addComment", async (req, res) => {
  const { comment } = req.body;

  try {
    const user = await User.findOne({ "images._id": req.params.id });

    if (user) {
      const image = user.images.id(req.params.id);
      image.comments.push(comment);
      await user.save();
      res.status(201).json({ comment });
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
})

//DYNAMIC USER///////////////////////////////////////////////////////////

// Define route to get user's email by username
app.get("/user/email/:usernametype", async (req, res) => {
  try {
    const username = req.params.usernametype;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error fetching user's email:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

////////////////////////////////////////////////////////////////////////

app.use(followController);
app.use(ImageController);

// Server port is 8000
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
