import React from 'react';
import ReactDOM from 'react-dom';
import '/styles/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@popperjs/core"; 
import "bootstrap";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);