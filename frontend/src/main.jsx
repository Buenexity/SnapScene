import React from 'react';
import ReactDOM from 'react-dom';
import '/styles/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "@popperjs/core"; 
import "bootstrap";
import firebase from "firebase/compat/app"


const firebaseConfig = 
{
  apiKey: "AIzaSyAajI9iHNcMERDuxoRN8tgI-agc__c9X2o",
  authDomain: "cs110-snapscene.firebaseapp.com",
  projectId: "cs110-snapscene",
  storageBucket: "cs110-snapscene.appspot.com",
  messagingSenderId: "77013163311",
  appId: "1:77013163311:web:b1d14404deaaf1bb4e95da",
  measurementId: "G-4JWT3C62MV"
};


firebase.initializeApp(firebaseConfig)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);