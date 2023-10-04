import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';

const recursosAcademicos = [
  {
    id: '1',
    categoria: 'Matemáticas',
    titulo: 'Álgebra Lineal',
    descripcion: 'Material de estudio de álgebra lineal',
    contenido: 'Contenido detallado del álgebra lineal...',
  },
  {
    id: '2',
    categoria: 'Historia',
    titulo: 'Historia del Siglo XX',
    descripcion: 'Recursos para aprender sobre la historia del siglo XX',
    contenido: 'Información histórica detallada...',
  },
  {
    id: '3',
    categoria: 'Ciencias',
    titulo: 'Química Orgánica',
    descripcion: 'Guía de estudio de química orgánica',
    contenido: 'Contenido detallado de química orgánica...',
  },
  // Agrega más recursos aquí
];

const RecursosScreen = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openResourceDetails = (resource) => {
    setSelectedResource(resource);
  };

  const closeResourceDetails = () => {
    setSelectedResource(null);
  };

  const filteredRecursos = recursosAcademicos.filter((resource) =>
    resource.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        data={filteredRecursos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openResourceDetails(item)}>
            <View style={styles.resourceItem}>
              <Text style={styles.resourceTitle}>{item.titulo}</Text>
              <Text style={styles.resourceDescription}>{item.descripcion}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedResource && (
        <Modal animationType="slide" transparent={false} visible={!!selectedResource}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedResource.titulo}</Text>
            <Text style={styles.modalDescription}>{selectedResource.descripcion}</Text>
            <Text style={styles.modalContent}>{selectedResource.contenido}</Text>
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
  },
  searchInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  resourceItem: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
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