import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [textSize, setTextSize] = useState('mediano');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('Usuario Anónimo');
  const [email, setEmail] = useState('Correo');

  useEffect(() => {
    const fetchTextStyles = async () => {
      try {
        const storedTextSize = await AsyncStorage.getItem('appTextSize');
        if (storedTextSize) {
          setTextSize(storedTextSize);
        }

        const storedFontFamily = await AsyncStorage.getItem('appFontFamily');
        if (storedFontFamily) {
          setFontFamily(storedFontFamily);
        }
      } catch (error) {
        console.error("Error al recuperar el tamaño de texto o la fuente:", error);
      }
    };

    fetchTextStyles();

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

    fetchDarkMode();

    const fetchUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          const usernamePart = storedEmail.split('@')[0];
          setUsername(usernamePart);
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error("Error al recuperar los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleDarkMode = async (value) => {
    setIsDarkMode(value);
    try {
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(value));
    } catch (error) {
      console.error("Error al guardar el modo oscuro:", error);
    }
  };

  const handleTextSizeChange = async (newSize) => {
    try {
      await AsyncStorage.setItem('appTextSize', newSize);
      setTextSize(newSize);
    } catch (error) {
      console.error("Error al guardar el tamaño del texto:", error);
    }
  };

  const handleFontFamilyChange = async (newFontFamily) => {
    try {
      await AsyncStorage.setItem('appFontFamily', newFontFamily);
      setFontFamily(newFontFamily);
    } catch (error) {
      console.error("Error al guardar el tipo de fuente:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      <Text style={styles.subtitle}>Tamaño del texto</Text>
      <Picker
        selectedValue={textSize}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => handleTextSizeChange(itemValue)}
      >
        <Picker.Item label="Pequeño" value="pequeño" />
        <Picker.Item label="Mediano" value="mediano" />
        <Picker.Item label="Grande" value="grande" />
      </Picker>

      <Text style={styles.subtitle}>Tipo de fuente</Text>
      <Picker
        selectedValue={fontFamily}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => handleFontFamilyChange(itemValue)}
      >
        <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="Comic Sans" value="comic-sans" />
        <Picker.Item label="Broadway" value="broadway" />
      </Picker>

      <View style={styles.darkModeContainer}>
        <Text style={styles.subtitle}>Modo Oscuro</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#1C74AA' : '#f4f3f4'}
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      <Text style={styles.subtitle}>Usuario</Text>
      <Text>{username}</Text>

      <Text style={styles.subtitle}>Email</Text>
      <Text>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SettingsScreen;
