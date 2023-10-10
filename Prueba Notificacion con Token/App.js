import React from 'react';
import Acceder from './src/complementos/navigation';
import {getAuth, signInAnonymously} from "firebase/auth"
import {messaging } from "./firebase";
import{getToken, onMessage} from "firebase/messaging";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
   <Acceder/>
  );
};
const activarMensajes =async ()=> {
  const token =await getToken(messaging, {
    vapidKey: "BBHWGhji1fCWY3IsM78XDzyxNNVVn0dDLQcaZ93utSDolhHTZOQY0BNdy06JyQeJvHKEcfgORSHL7wKUJ56HcSI"
  }).catch(error => console.log("Error Token"));
  if(token) console.log ("Tu token: ", token);
  if(!token) console.log ("No hay token");

}
export default App;