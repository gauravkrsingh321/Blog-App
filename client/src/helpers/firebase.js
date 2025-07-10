// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "blog-app-2b578.firebaseapp.com",
  projectId: "blog-app-2b578",
  storageBucket: "blog-app-2b578.firebasestorage.app",
  messagingSenderId: "23266343776",
  appId: "1:23266343776:web:1e3f76f63b3eda317d3c05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth,provider}