import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Profile from "./components/profile";
import PostPage from "./components/postPage";
import "../styles/App.css";
import DynamicProfile from "./components/DynamicProfile";
import Tag from "./components/Tag";
import TagPage from "./components/TagPage";

function App() {
  const [tagObject, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getTags`);
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const tagList = Object.values(tagObject);

  //Either the user
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  //retrieve user on refresh
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    sessionStorage.setItem("tagList", JSON.stringify(tagList));
  }, [tagList]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="Login-Page"
              style={{
                background:
                  "linear-gradient(to bottom right, #8B0000, #00008B)",
              }}
            >
              <div className="background-image"></div>
              <div className="login-det">
                <LoginForm setUser={setUser} user={user} />
              </div>
            </div>
          }
        />
        <Route path="/home" element={<Home user={user} tags={tagList} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/profile/:username"
          element={<DynamicProfile user={user} />}
        />
        <Route path="/tags" element={<TagPage tags={tagList} />} />
        <Route path="/tags/:tag" element={<Tag />} />
        <Route path="/posts/:id" element={<PostPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
