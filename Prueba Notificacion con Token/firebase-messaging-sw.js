import { messaging } from "../src/complementos/FirebaseNoti.js";

// Import the functions you need from the SDKs you need
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js")


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
const app = firebase.initializeApp(FirebaseNoti);
const messaging = getMessaging(app)

messaging.onBackgroundMessage(payload => {
    console.log("Recibiste mensaje mientras estabas ausente");
    const notificationTitle = payload.notificacion.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/src/img/logo_uct.png"
    }

    return self.ServiceWorkerRegistration.showNotification(
        notificationTitle,
        notificationOptions  
    )
})