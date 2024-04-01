// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getApp, getAuth } from "./src/services/firebase";
import { getFirestore } from "firebase/firestore";
import { API_KEY_FIREBASE, APP_ID_FIREBASE } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY_FIREBASE,
  authDomain: "job-trek.firebaseapp.com",
  projectId: "job-trek",
  storageBucket: "job-trek.appspot.com",
  messagingSenderId: "1050312456563",
  appId: APP_ID_FIREBASE
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
