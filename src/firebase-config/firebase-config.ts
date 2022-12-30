import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID;
const APP_ID = process.env.REACT_APP_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// const firebaseConfig = {
//     apiKey: "AIzaSyC50hVbwfhDDzjv7mDqU5TrPS9VphKA5-w",
//     authDomain: "calculator-98860.firebaseapp.com",
//     projectId: "calculator-98860",
//     storageBucket: "calculator-98860.appspot.com",
//     messagingSenderId: "1002389680117",
//     appId: "1:1002389680117:web:9dbbda21be72cddea6babc"
//   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
