import React from 'react';
import { View } from 'react-native';
import ButtonGroup from './ButtonGroup'; // Importa el componente ButtonGroup

function App() {
  const tutorias = [
    { profesor: 'Profesor 1', materia: 'Materia 1' },
    { profesor: 'Profesor 2', materia: 'Materia 2' },
    { profesor: 'Profesor 3', materia: 'Materia 3' },
    // Agrega más tutorías según sea necesario
  ];

  const handleTutoriaPress = (tutoria) => {
    // La función se llama cuando se presiona una tutoría
    console.log(`Tutoría para ${tutoria.profesor}: ${tutoria.materia}`);
    // Puedes realizar acciones adicionales según la tutoría seleccionada.
  };

  return (
    <View>
      {/* Otras partes de tu aplicación */}
      <ButtonGroup tutorias={tutorias} onPress={handleTutoriaPress} />
    </View>
  );
}

export default App;
