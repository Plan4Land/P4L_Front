// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";

const key = process.env.REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: key,
  authDomain: "plan4land-e7018.firebaseapp.com",
  projectId: "plan4land-e7018",
  storageBucket: "plan4land-e7018.firebasestorage.app",
  messagingSenderId: "906105005817",
  appId: "1:906105005817:web:dafb25826f66368a5ae428"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = firebase.storage();
