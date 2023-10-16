import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Nuevo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Esta es una nueva vista en tu aplicación.</Text>
        {/* Agrega más componentes y lógica según sea necesario */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Nuevo;
