
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBoCa81sPMRRs8ynpk0W0NeZlnNy5BZ5Qg",
  authDomain: "apptaller3.firebaseapp.com",
  projectId: "apptaller3",
  storageBucket: "apptaller3.appspot.com",
  messagingSenderId: "741672603860",
  appId: "1:741672603860:web:f7d42d8e61204cf79eab41",
  measurementId: "G-ZSKJRS14MS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firebase_AUTH = getAuth(app);

export { app, db, firebase_AUTH};
