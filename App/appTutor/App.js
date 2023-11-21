import React from 'react';
import Acceder from './src/complementos/navigation';
import { LogBox } from 'react-native';


LogBox.ignoreAllLogs(); // Ignora todos los warnings


const App = () => {
  return (
   <Acceder/>
  );
};

export default App;