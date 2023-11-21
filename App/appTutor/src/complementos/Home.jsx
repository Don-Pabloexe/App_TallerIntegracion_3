
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import { CommonStyles, HomeStyles, Info, Tutor, Sala, Horario, blog, recursos, chatbot, door } from './../css/Home';

const HomeScreen = ({ navigation }) => {
  return (
    
    <View style={CommonStyles.container }>
      <View style={styles.row}>
        <TouchableOpacity
          style={HomeStyles.button}
          onPress={() => navigation.navigate('Salas')}
        >
          <Image
            style={HomeStyles.image}
            source={door}
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
          onPress={() => navigation.navigate('Profesores')}
        >
          <Image
            style={HomeStyles.image}
            source={Horario}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={HomeStyles.button}
          onPress={() => navigation.navigate('Blog Educativo')}
        >
          <Image
            style={HomeStyles.image}
            source={blog}
          />
        </TouchableOpacity>


        {/* Agrega más botones aquí */}
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={HomeStyles.button}
          onPress={() => navigation.navigate('Talleres')}
        >
          <Image
            style={HomeStyles.image}
            source={recursos}
          />
        </TouchableOpacity>

       
        </View>
      {/* Agrega más filas de botones si es necesario */}
    </View>
    
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // Organiza los botones en una fila horizontal
    justifyContent: 'center', // Distribuye los botones de manera uniforme en el espacio horizontal
  },
});

export default HomeScreen;