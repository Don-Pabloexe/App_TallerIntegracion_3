import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { firebase_AUTH } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const image = require('./../img/logo_uct.png')

const LoginScreen = ( {navigation} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState (false);
  const auth = firebase_AUTH;

  const signIn = async () => {
    setLoading (true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log (response);
      navigation.navigate('accesoexitoso');

      } catch (error) {
      console.log(error);
      alert('Datos de inicio de sesion incorrectos');

      } finally {
      setLoading (false);
      }

  }

  const signUp = async () => {
    setLoading (true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log (response);
      alert('Se inicio correctamente');

      } catch (error) {
      console.log(error);
      alert('El email que intenta registrar ya se encuentra en uso');

      } finally {
      setLoading (false);
      }
    }

  return (

    <View style = {styles.container}>
    <ImageBackground source={image} resizeMode = "stretch" style = {styles.image}>

      <Text style={styles.label}>Nombre de usuario:</Text>
      <TextInput value = {email} style = {styles.input} placeholder = "Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}/>

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput secureTextEntry = {true} value = {password} style = {styles.input} placeholder = "Contraseña" autoCapitalize = "none" onChangeText = {(text) => setPassword(text)}/>

    { loading ? (

    <ActivityIndicator size = "large" color = "#000ff" />

    ): (
      <>
      <TouchableOpacity style = {[styles.buttonSec]}>
        <Text onPress = {signIn} style = {[styles.button]}>Iniciar sesión</Text>
        <Text onPress = {signUp} style = {[styles.button]}>Registrarse</Text>
      </TouchableOpacity>
      </>
    )}

    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  label: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,

  },

  image: {
    justifyContent: 'center',
    paddingHorizontal: '12%',
    paddingVertical: '23%',
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
    height: 30,
    textAlign: 'center'
  },

  buttonSec: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
   
  button: {
    borderRadius: 10,
    backgroundColor: '#258FD0',
    marginHorizontal: '4%',
    padding: 10,
    color: 'white',
    flexDirection: 'row',
  },

});

export default LoginScreen;
