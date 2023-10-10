// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzvwmJiVrYQrvknSgF94FdUbs-26ChE5s",
  authDomain: "notificaciones-5a7d9.firebaseapp.com",
  projectId: "notificaciones-5a7d9",
  storageBucket: "notificaciones-5a7d9.appspot.com",
  messagingSenderId: "540878306340",
  appId: "1:540878306340:web:7f0d4cbffefc6f9fc26cb1",
  measurementId: "G-CBDRQ9DTM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app)