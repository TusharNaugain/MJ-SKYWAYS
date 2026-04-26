// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkERk-HpYI5_4aE_QbpJ1OMONx60ShbxA",
  authDomain: "mjsairways.firebaseapp.com",
  databaseURL: "https://mjsairways-default-rtdb.firebaseio.com",
  projectId: "mjsairways",
  storageBucket: "mjsairways.firebasestorage.app",
  messagingSenderId: "765561325212",
  appId: "1:765561325212:web:2b4f2182dda3a52f8e0f59",
  measurementId: "G-TEQ60GF5VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
