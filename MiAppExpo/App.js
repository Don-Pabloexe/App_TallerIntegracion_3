import React from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const handleButtonPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Recursos para Docentes</Text>
      </View>
      <View style={styles.content}>
        <Button
          title="Plataforma de Aprendizaje"
          onPress={() => handleButtonPress('https://www.plataformadeaprendizaje.com')}
        />
        <Button
          title="Biblioteca Virtual"
          onPress={() => handleButtonPress('https://www.bibliotecavirtual.com')}
        />
        <Button
          title="Comunidad de Educadores"
          onPress={() => handleButtonPress('https://www.comunidadeducadores.com')}
        />
        <Button
          title="Herramientas Didácticas"
          onPress={() => handleButtonPress('https://www.herramientasdidacticas.com')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5', // Fondo con color crema educativo
  },
  navBar: {
    backgroundColor: '#007ACC',
    paddingVertical: 10,
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default App;
