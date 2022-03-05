// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebase = {
  apiKey: typeof apiKey === "string" ? apiKey : "", //process.env.FIREBASE_API_KEY
  authDomain: "henry-social.firebaseapp.com",
  projectId: "henry-social",
  storageBucket: "henry-social.appspot.com",
  messagingSenderId: "349466628260",
  appId: "1:349466628260:web:321570037792e59ff49631",
  measurementId: "G-0V5CBF1JWF",
};

// Initialize Firebase
export const app = initializeApp(firebase);

export const auth = getAuth(app);
export const storage = getStorage(app);
