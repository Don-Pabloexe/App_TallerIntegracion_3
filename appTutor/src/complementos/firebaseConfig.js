
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDrf_SaN7pv-cDZH66GPkM3_3cnOIXlN44",
  authDomain: "appmovil-401b5.firebaseapp.com",
  databaseURL: "https://appmovil-401b5-default-rtdb.firebaseio.com",
  projectId: "appmovil-401b5",
  storageBucket: "appmovil-401b5.appspot.com",
  messagingSenderId: "412231256424",
  appId: "1:412231256424:web:34df5f3ec93e62a4226edd",
  measurementId: "G-8L5R3E9Q7T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firebase_AUTH = getAuth(app);

export { app, db, firebase_AUTH};
