import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonStyles, HomeStyles, Info, Tutor, Sala, Horario, blog, recursos, chatbot } from './../css/Home';

const HomeScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchDarkMode = async () => {
    try {
      const darkModeValue = await AsyncStorage.getItem('isDarkMode');
      if (darkModeValue !== null) {
        setIsDarkMode(JSON.parse(darkModeValue));
      }
    } catch (error) {
      console.error("Error al recuperar el modo oscuro:", error);
    }
  };

  useEffect(() => {
    fetchDarkMode();
  }, []);

  const backgroundColor = isDarkMode ? '#333' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#333';

  return (
    <View style={[CommonStyles.container, { backgroundColor }]}>
      <View style={styles.row}>
        <TouchableOpacity
          style = {HomeStyles.button}
          onPress={() => navigation.navigate('Salas')}
        >
          <Image
            style={HomeStyles.image}
            source={Sala}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style = {HomeStyles.button}
          onPress = {() => navigation.navigate('Tutores')}
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
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
});

export default HomeScreen;
