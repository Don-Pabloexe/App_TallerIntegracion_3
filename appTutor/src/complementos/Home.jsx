import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { CommonStyles, HomeStyles, Info, Tutor, Sala, Horario, blog, recursos, chatbot } from './../css/Home';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

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

        <TouchableOpacity
          style={HomeStyles.button}
          onPress={() => navigation.navigate('Blog')}
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
          onPress={() => navigation.navigate('recursos')}
        >
          <Image
            style={HomeStyles.image}
            source={recursos}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={HomeStyles.button}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <Image
            style={HomeStyles.image}
            source={chatbot}
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
    marginBottom: 0, // Añade margen inferior para separar las filas
  },
});

export default HomeScreen;