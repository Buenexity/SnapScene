// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "./components/Headers.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Home from "./components/Home.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="Login-Page">
              <div className="background-image"></div>
              <div className="login-det">
                <LoginForm />
              </div>
            </div>
          }
        />
        <Route path="/home" element={<Home />} />
        {/*add other routes below this */}
      </Routes>
    </Router>
  );
}

export default App;
