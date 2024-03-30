// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWl-Mlap1RGErsDE6Z43J01DM8R3lw9II",
  authDomain: "job-trek.firebaseapp.com",
  projectId: "job-trek",
  storageBucket: "job-trek.appspot.com",
  messagingSenderId: "1050312456563",
  appId: "1:1050312456563:web:60c6e01528237cfd776d06"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
