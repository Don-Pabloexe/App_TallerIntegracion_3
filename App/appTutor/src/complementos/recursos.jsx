import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const RecursosScreen = () => {
  const [recursos, setRecursos] = useState([]); // Para almacenar los datos de Firestore
  const [searchQuery, setSearchQuery] = useState(''); // Para el valor de búsqueda
  const [selectedResource, setSelectedResource] = useState(null); // Para el recurso seleccionado
  const [filteredRecursos, setFilteredRecursos] = useState([]); // Para almacenar los recursos filtrados

  useEffect(() => {
    const fetchRecursosData = async () => {
      try {
        const recursosCollectionRef = collection(db, 'recursos');
        const recursosQuery = query(
          recursosCollectionRef,
          where('titulo', '>=', searchQuery),
          where('titulo', '<=', searchQuery + '\uf8ff')
        );

        const querySnapshot = await getDocs(recursosQuery);

        const recursosData = [];

        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          recursosData.push(data);
        });

        setRecursos(recursosData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchRecursosData();
  }, [searchQuery]);

  // Función para abrir los detalles del recurso
  const openResourceDetails = (resource) => {
    setSelectedResource(resource);
  };

  // Función para cerrar los detalles del recurso
  const closeResourceDetails = () => {
    setSelectedResource(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recursos Académicos</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar recursos..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={recursos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openResourceDetails(item)}>
            <View style={styles.resourceItem}>
              <Text style={styles.resourceTitle}>{item.titulo}</Text>
              <Text style={styles.resourceDescription}>{item.subtitulo}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedResource && (
        <Modal animationType="slide" transparent={false} visible={!!selectedResource}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedResource.titulo}</Text>
            <Text style={styles.modalDescription}>{selectedResource.subtitulo}</Text>
            <Text style={styles.modalContent}>{selectedResource.descripcion}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeResourceDetails}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },

  searchInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: '80%',
    alignSelf: 'center',
  },

  resourceItem: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    textAlign: 'center'
  },

  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  resourceDescription: {
    fontSize: 14,
  },

  modalContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  modalDescription: {
    fontSize: 18,
    marginBottom: 8,
  },

  modalContent: {
    fontSize: 16,
    marginBottom: 16,
  },

  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },

  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RecursosScreen;
