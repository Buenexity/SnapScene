// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/Headers.jsx';
import LoginForm from './components/LoginForm.jsx';
import './App.css'; 
function App() {
  return (
    <Router>

      {/*Page for Login and Account Creation*/}
      <div className="Login-Page">
        <div className="background-image"></div>
        <div className="login-det">
          <Routes>
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </div>
      </div>


    </Router>
  );
}

export default App;
