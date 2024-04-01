import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { API_KEY_FIREBASE, APP_ID_FIREBASE } from "@env";

const firebaseConfig = {
  apiKey: API_KEY_FIREBASE,
  authDomain: "job-trek.firebaseapp.com",
  projectId: "jobt-58ad7",
  storageBucket: "job-trek.appspot.com",
  messagingSenderId: "911310940037",
  appId: APP_ID_FIREBASE
};

//initialize firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app)

//initialize fireStore
const db = getFirestore(app);

//initialize firebase auth
const auth = getAuth(app);

export { db, app, auth };
