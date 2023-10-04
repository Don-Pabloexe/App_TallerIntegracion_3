import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const image = require('./../img/logo_uct.png')

const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    //autenticacion logica
    try {
      if(username == "arias" && password == "contra"){
        navigation.navigate('accesoexitoso');
      }//si la autenticacion es exitosa redirige al Home
      
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (

    <View style={styles.container}>
    <ImageBackground source={image} resizeMode = "stretch" style = {styles.image}>
      <Text style={styles.label}>Nombre de usuario:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder=""
        style={styles.input}
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        secureTextEntry
        style={styles.input}
      />
       <TouchableOpacity
        style={[styles.button]}
        onPress={handleLogin}
      >
        <Text style={[styles.buttonText, { color: 'white' }]}>Iniciar sesión</Text>
      </TouchableOpacity>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Color de fondo del contenedor
    
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,

  },

  image: {
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 80,
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: '#075fb0', // Color del borde
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: 280,
    height: 30
  },
   
  button: {
    borderRadius:5,
    width: 100,
    height: 25,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: '#258FD0',
    
  },
});
export default LoginScreen;
