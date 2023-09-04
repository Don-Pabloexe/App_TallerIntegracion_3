import React from 'react';
import { View } from 'react-native';
import ButtonGroup from './ButtonGroup'; // Importa el componente ButtonGroup

function App() {
  const Documento = [
    { profesor: 'Profesor 1', materia: 'Materia 1' },
    { profesor: 'Profesor 2', materia: 'Materia 2' },
    { profesor: 'Profesor 3', materia: 'Materia 3' },
    // Agrega más tutorías según sea necesario
  ];

  const handleDocumentoPress = (Documento) => {
    // La función se llama cuando se presiona una tutoría
    console.log(`Tutoría para ${Docuemento.profesor}: ${Docuemnto.materia}`);
    // Puedes realizar acciones adicionales según la tutoría seleccionada.
  };

  return (
    <View>
      {/* Otras partes de tu aplicación */}
      <ButtonGroup Docuemnto={Documento} onPress={handleDocumentoPress} />
    </View>
  );
}

export default App;