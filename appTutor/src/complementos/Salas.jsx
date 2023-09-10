import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DetailsScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelection = (image) => {
    setSelectedImage(image);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cual es tu Campus?</Text>
      
      {selectedImage && (
        <Image style={styles.logo} source={selectedImage} />
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#00BFFF' }]} // Cambia el color a celeste (#00BFFF)
        onPress={() => handleImageSelection(require('./../img/libreta.png'))}
      >
        <Text style={styles.buttonText}>CAMPUS JUAN PABLO II</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#00BFFF' }]} // Cambia el color a celeste (#00BFFF)
        onPress={() => handleImageSelection(require('./../img/otra_imagen.png'))}
      >
        <Text style={styles.buttonText}>CAMPUS SAN FRANCISCO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFDED',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DetailsScreen;
