const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cors());

const users = [];
//very super secret key to see " JSON Web Tokens"
const SECRET_KEY = "kC^nU$mD*UL@Zuam";

app.get("/", (req, res) => {
  res.json(users);
});

/* 
    Post Request to save email,username,and password into users array
    Must Do:
    Implement Database
*/

app.post("/signup", (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  if (username && users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = { email, password };

  if (username) {
    newUser.username = username;
  }

  users.push(newUser);

  //User can refresh page after login
  const token = jwt.sign({ email: newUser.email }, SECRET_KEY, {
    expiresIn: "2h",
  });

  res.status(201).json({ user: newUser, token });
});

/* 
    Post Request to login into the webpage

*/

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", req.body); // Log incoming login data

  if (!email || !password) {
    return res.status(400).json({ message: "Need email and password" });
  }

  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  //enable the cookies to login user after refresh
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login successful", user, token });
});

//Server port is 5000

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
