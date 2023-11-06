import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { TouchableOpacity } from 'react-native';


const RecursosScreen = () => {
  const [userRole, setUserRole] = useState(null); // Rol del usuario inicialmente nulo
  const [tituloRecurso, setTituloRecurso] = useState('');
  const [subtituloRecurso, setSubtituloRecurso] = useState('');
  const [descripcionRecurso, setDescripcionRecurso] = useState('');
  const [recursos, setRecursos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [recursosFiltrados, setRecursosFiltrados] = useState([]);

  const auth = getAuth();
  const recursosCollectionRef = collection(db, 'recursos');
  const q = query(recursosCollectionRef, orderBy("titulo")); // Ordena los recursos por título alfabéticamente

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserRole(user.displayName); // Asumir que el rol se almacena en 'displayName'
      } else {
        // User not logged in handling or user information not available
      }
    });

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newRecursos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecursos(newRecursos);
    });

    return () => {
      unsubscribeAuth();
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (filtroTexto.trim() === '') {
      setRecursosFiltrados(recursos); // No filter text, show all recursos
    } else {
      // Filter list based on search text
      const filteredData = recursos.filter((recurso) =>
        recurso.titulo.toLowerCase().includes(filtroTexto.toLowerCase())
      );
      setRecursosFiltrados(filteredData); // Update the filtered recursos
    }
  }, [recursos, filtroTexto]);

  const handleAddRecurso = async () => {
    if (!tituloRecurso.trim() || !descripcionRecurso.trim()) {
      Alert.alert('Error', 'Por favor, introduce el título y la descripción del recurso.');
      return;
    }

    try {
      await addDoc(recursosCollectionRef, {
        titulo: tituloRecurso,
        subtitulo: subtituloRecurso,
        descripcion: descripcionRecurso,
      });
      Alert.alert('Éxito', 'Recurso añadido correctamente');
      setTituloRecurso('');
      setSubtituloRecurso('');
      setDescripcionRecurso('');
    } catch (error) {
      Alert.alert('Error', `No se pudo añadir el recurso: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Role-based view to add resources */}
      {userRole === 'asesor' && (
        <View style={styles.addResourceSection}>
          <TextInput
            style={styles.input}
            placeholder="Título del Recurso"
            placeholderTextColor="#6e6e6e"
            value={tituloRecurso}
            onChangeText={setTituloRecurso}
          />
          <TextInput
            style={styles.input}
            placeholder="Subtítulo del Recurso (opcional)"
            placeholderTextColor="#6e6e6e"
            value={subtituloRecurso}
            onChangeText={setSubtituloRecurso}
          />
          <TextInput
            style={[styles.input, styles.inputLarge]}
            placeholder="Descripción del Recurso"
            placeholderTextColor="#6e6e6e"
            value={descripcionRecurso}
            onChangeText={setDescripcionRecurso}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleAddRecurso}>
            <Text style={styles.buttonText}>Añadir Recurso</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search bar */}
      <TextInput
        style={[styles.input, styles.searchBar]}
        placeholder="Buscar Recursos"
        placeholderTextColor="#6e6e6e"
        value={filtroTexto}
        onChangeText={setFiltroTexto}
      />

      {/* List of available resources */}
      <FlatList
        data={recursosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            {item.subtitulo && <Text style={styles.cardSubtitle}>{item.subtitulo}</Text>}
            <Text style={styles.cardContent}>{item.descripcion}</Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addResourceSection: {
    backgroundColor: '#e8e8e8',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  inputLarge: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  searchBar: {
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
  },
  list: {
    marginBottom: 10,
  },
  // ... Añade otros estilos que necesites aquí
});

export default RecursosScreen;
