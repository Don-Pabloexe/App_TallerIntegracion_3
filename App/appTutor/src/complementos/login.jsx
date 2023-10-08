import { View, Text, StyleSheet, ActivityIndicator, Button} from "react-native-web";
import React, {useState} from "react";
import {firebase_AUTH} from './firebaseConfig';
import { TextInput } from "react-native-gesture-handler";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState (false);
  const auth = firebase_AUTH;

  const signIn = async () => {
    setLoading (true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log (response);
      } catch (error) {
      console.log(error);
      alert('fallo inicio de sesion ' + error.message);
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
      alert('fallo inicio de sesion ' + error.message);
      } finally {
      setLoading (false);
      }

  }
  return (
    <View styles={styles.container}>
      <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Contraseña" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
    { loading ? (
    <ActivityIndicator size="large" color="#000ff" />
    ): (
      <>
        <Button title="Login" onPress={signIn}/>
        <Button title="Crear Cuenta" onPress={signUp}/>
      </>
    )}
    </View>
  );
};
  export default LoginScreen;




  const styles = StyleSheet.create({
    container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
    },
    input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
    }
  });