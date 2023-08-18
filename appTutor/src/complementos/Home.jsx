import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import sala from './../img/18625.png';
import tutor from './../img/tutores.png';
import horario from './../img/libreta.png';
import { color } from 'react-native-reanimated';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={[styles.button, {  }]}
      onPress={() => navigation.navigate('Salas', { imageRoute: sala})}
      >  
        <Image
        style = {styles.image}
        source={sala}
        />
        </TouchableOpacity>
      
      
        <TouchableOpacity
      style={[styles.button, {}]}
      onPress={() => navigation.navigate('Tutores', {imageRoute: tutor})}
      >  
        <Image
        style = {styles.image}
        source={tutor}
        />
        </TouchableOpacity>
        <TouchableOpacity
      style={[styles.button, { width: 100, height: 100 }]}
      onPress={() => navigation.navigate('Horarios', {imageRoute: horario})}
      >  
        <Image
        style = {styles.image}
        source={horario}
        />
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#FFFDED"
    
  },
  button: {
    top: 300,
    alignItems: 'center',
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    margin: 10,
    width: 100, 
    height: 100
    
  },
  image: {
    width: 90,
    height: 90,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
export default HomeScreen;