
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

const RecursosScreen = () => {
  const [recursos, setRecursos] = useState([]); // Para almacenar los datos de Firestore
  const [searchQuery, setSearchQuery] = useState(''); // Para el valor de búsqueda
  const [searched, setSearched] = useState(false); // Para rastrear si se ha realizado una búsqueda

  const fetchRecursosData = async () => {
    try {
      const recursosCollectionRef = collection(db, 'salas');
      const recursosQuery = query(recursosCollectionRef, where('nombre', '>=', searchQuery), where('nombre', '<=', searchQuery + '\uf8ff'));

      const querySnapshot = await getDocs(recursosQuery);

      const recursosData = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        recursosData.push(data);
      });

      // Actualiza el estado de tu componente con estos datos y marca que se ha realizado una búsqueda
      setRecursos(recursosData);
      setSearched(true);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  
  return (

    <View style = {styles.container}>
      <Text style = {styles.title}>Buscador de Salas</Text>
      <TextInput style = {styles.searchInput} placeholder = 'CPJ07_220..' onChangeText = {(text) => setSearchQuery(text)} />
      <TouchableOpacity style={styles.button} onPress={fetchRecursosData}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      
      <FlatList
        data = {recursos}
        keyExtractor = {(item) => item.id}
        renderItem = {({ item }) => (

      <View style={styles.item}>

        <Text style = {{flex: 1}}>
          <Text style={styles.titulo}>Nombre:{'\n'}</Text> {item.nombre}
        </Text>

        <Text style = {{flex: 1}}>
          <Text style={styles.titulo}>Edificio:{'\n'}</Text> {item.edificio}
        </Text>

        <Text style = {{flex: 1}}>
          <Text style = {styles.titulo}>Piso:{'\n'}</Text> {item.piso}
        </Text>

      </View>

    )}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    margin: '4%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  titulo: {
    flex: 1,
    fontWeight: 'bold'
  },

  searchInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: '80%',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    width: '13%',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '5%'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center'  
  },

  item: {
    padding: '2%',
    marginBottom: '2%',
    width: '100%',
    backgroundColor: '#c5dceb',
    flexDirection: 'row',
    borderColor: 'black',
    textAlign: 'center'
  },

});

export default RecursosScreen;
