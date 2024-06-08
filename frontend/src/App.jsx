import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Profile from "./components/profile";
import "../styles/App.css";
import DynamicProfile from "./components/DynamicProfile";

function App() {
  //Either the user

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  //retrieve user on refresh
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/profile/:username" element={<DynamicProfile user={user}/>} />
        {/*Add routes to pages below this */}
      </Routes>
    </Router>
  );
}

export default App;
