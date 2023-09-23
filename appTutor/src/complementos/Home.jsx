import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { CommonStyles, HomeStyles, Info, Tutor, Sala, Horario } from './../css/Home';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={CommonStyles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={HomeStyles.button}
          onPress={() => navigation.navigate('Salas')}
        >
          <Image
            style={HomeStyles.image}
            source={Sala}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={HomeStyles.button}
          onPress={() => navigation.navigate('Tutores')}
        >
          <Image
            style={HomeStyles.image}
            source={Tutor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={HomeStyles.button}
          onPress={() => navigation.navigate('Horarios')}
        >
          <Image
            style={HomeStyles.image}
            source={Horario}
          />
        </TouchableOpacity>

        {/* Agrega más botones aquí */}
      </View>

      {/* Agrega más filas de botones si es necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // Organiza los botones en una fila horizontal
    justifyContent: 'space-between', // Distribuye los botones de manera uniforme en el espacio horizontal
    marginBottom: 16, // Añade margen inferior para separar las filas
  },
});

export default HomeScreen;