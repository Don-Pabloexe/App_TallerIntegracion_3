import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

const ProfesoresScreen = () => {
  // Lista de profesores con nombres y correos electrónicos
  const profesores = [
    { id: '1', nombre: 'Profesor 1', correo: 'profesor1@ejemplo.com' },
    { id: '2', nombre: 'Profesor 2', correo: 'profesor2@ejemplo.com' },
    { id: '3', nombre: 'Profesor 3', correo: 'profesor3@ejemplo.com' },
    { id: '4', nombre: 'Profesor 4', correo: 'profesor3@ejemplo.com' },
    { id: '5', nombre: 'Profesor 5', correo: 'profesor3@ejemplo.com' },
    { id: '6', nombre: 'Profesor 6', correo: 'profesor3@ejemplo.com' },
    { id: '7', nombre: 'Profesor 7', correo: 'profesor3@ejemplo.com' },
    // Agrega más profesores según sea necesario
  ];

  const [asunto, setAsunto] = useState('');
  const [contenido, setContenido] = useState('');

  // Función para manejar la acción de enviar correo electrónico
  const handleSendEmail = (correo) => {
    // Verifica que haya un asunto y contenido antes de enviar el correo
    if (asunto.trim() !== '' && contenido.trim() !== '') {
      // Utiliza el método `Linking.openURL` para abrir la aplicación de correo electrónico del dispositivo
      Linking.openURL(`mailto:${correo}?subject=${asunto}&body=${contenido}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Profesores</Text>
      <FlatList
        data={profesores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.profesorItem}
            onPress={() => handleSendEmail(item.correo)}
          >
            <Text style={styles.profesorNombre}>{item.nombre}</Text>
            <Text style={styles.profesorCorreo}>{item.correo}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Asunto del Correo"
        value={asunto}
        onChangeText={(text) => setAsunto(text)}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Contenido del Correo"
        value={contenido}
        onChangeText={(text) => setContenido(text)}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  profesorItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profesorNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profesorCorreo: {
    fontSize: 16,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
});

export default ProfesoresScreen;