const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./users/users"); // Import the User model using require

const app = express();

app.use(express.json());
app.use(cors());

//token generator key
const SECRET_KEY = "kC^nU$mD*UL@Zuam";

//for testing purposes you change this to your data base
const mongoURI = "mongodb://localhost:27017/users-for";

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

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
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

// Server port is 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
