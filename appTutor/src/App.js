import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home, Navigation} from './complementos/Home.jsx';
import Login from './complementos/loginpage.jsx'
import Salas from "./complementos/salas.jsx";
import Solicitar from "./complementos/solicitar.jsx";
import Tutor from "./complementos/tutor.jsx";
import Boton from "./complementos/boton.jsx";
function HOME(){
  return(
    <>
      <Home />
      <Navigation/>
      

    </>
  )
}
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/home" element={<HOME/>} />
        <Route path="/salas" element={<Salas />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/solicitar" element={<Solicitar />} />
        <Route path="/"  />
      </Routes>
      
    </Router>
  );
}

export default App;
