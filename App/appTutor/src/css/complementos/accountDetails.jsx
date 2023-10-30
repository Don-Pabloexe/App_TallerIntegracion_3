
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountDetailsScreen = () => {
  const [username, setUsername] = useState('Usuario Anónimo');
  const [email, setEmail] = useState('Correo');

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleGoAccountDetail = () => {
    navigation.navigate('AccountDetail');
  };

  const fetchEmail = async () => {
    const storedEmail = await AsyncStorage.getItem('userEmail');

    if (storedEmail) {
      const usernamePart = storedEmail.split('@')[0]; // Toma solo la parte antes del '@'
      setUsername(usernamePart);
    }

    if (storedEmail) {
      const emailPart = storedEmail; // Toma solo la parte antes del '@'
      setEmail(emailPart);
    }
    
  };

  useEffect(() => {
    fetchEmail();
  }, []); 
  
  return (

    <View style = {styles.container}>
      <MaterialCommunityIcons style = {{marginTop: 60, marginBottom: 10}} name = "account" color = "#1C74AA" size = {100} />
      
      <Text style = {styles.title}>Usuario</Text>
      <Text style = {styles.content}>{username}</Text>

      <Text style = {styles.title}>Email</Text>
      <Text style = {styles.content}>{email}</Text>

      <Text style = {styles.title}>Área</Text>
      <Text style = {styles.content}>Furboaaaaa</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },

  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16
  },

});

export default AccountDetailsScreen;
