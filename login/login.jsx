import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
    <View>
      <Text>Nombre de usuario:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder=""
      />
      <Text>Contraseña:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
