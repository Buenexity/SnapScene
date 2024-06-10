import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAajI9iHNcMERDuxoRN8tgI-agc__c9X2o",
  authDomain: "cs110-snapscene.firebaseapp.com",
  projectId: "cs110-snapscene",
  storageBucket: "cs110-snapscene.appspot.com",
  messagingSenderId: "77013163311",
  appId: "1:77013163311:web:b1d14404deaaf1bb4e95da",
  measurementId: "G-4JWT3C62MV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = () => {
  return auth.signInWithPopup(googleProvider)
    .then((result) => {
      console.log(result.user.email)
      return result.user.email;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};



export { auth, signInWithGoogle};
export default firebase;
