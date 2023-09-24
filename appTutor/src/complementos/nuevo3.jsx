import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtraVista3 = () => {
  return (
    <View style={styles.container}>
      <Text>Esta es la vista OtraVista</Text>
      {/* Puedes agregar más contenido aquí */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OtraVista3;