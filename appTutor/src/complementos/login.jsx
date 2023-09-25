import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import {styl} from './../css/Home';

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
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D6EBFD', // Color de fondo del contenedor
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray', // Color del borde
    backgroundColor: 'white',
    borderWidth: 1,
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
