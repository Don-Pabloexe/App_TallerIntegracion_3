import React from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import {commonStyles, homeStyles, info, tutor, sala, horario} from './../css/Home'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <TouchableOpacity
      style={[homeStyles.button, {  }]}
      onPress={() => navigation.navigate('Salas')}
      >  
        <Image
        style = {homeStyles.image}
        source={sala}
        />
        </TouchableOpacity>
      
      
        <TouchableOpacity
      style={[homeStyles.button, {}]}
      onPress={() => navigation.navigate('Tutores')}
      >  
        <Image
        style = {homeStyles.image}
        source={tutor}
        />
        </TouchableOpacity>
        <TouchableOpacity
      style={[homeStyles.button, { width: 100, height: 100 }]}
      onPress={() => navigation.navigate('Horarios')}
      >  
        <Image
        style = {homeStyles.image}
        source={horario}
        />
        </TouchableOpacity>
        <TouchableOpacity
      style={[homeStyles.buttoninfo, { width: 30, height: 30 }]}
      onPress={() => navigation.navigate('Horarios')}
      >  
        <Image
        style = {homeStyles.info}
        source={info}
        />
        </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;