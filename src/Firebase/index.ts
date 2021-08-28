/* eslint-disable import/no-duplicates */
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
/* eslint-enable import/no-duplicates */

// import "firebase/analytics";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBRUEZxt0Da_9J-eSzEaZO8__XCyz9uGxw",
  authDomain: "credopay-8c3e3.firebaseapp.com",
  projectId: "credopay-8c3e3",
  storageBucket: "credopay-8c3e3.appspot.com",
  messagingSenderId: "1083991912244",
  appId: "1:1083991912244:web:955cb3e6bf4248cf987f61",
  measurementId: "G-WG170QBMH3",
};

firebase.initializeApp(firebaseConfig);

const { auth, firestore } = firebase;

export { firebase, auth, firestore };
