import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import sala from './../img/18625.png';
import tutor from './../img/tutores.png';
import horario from './../img/libreta.png';
import { color } from 'react-native-reanimated';
import img from '../img';
import Chatbot from './chatbot';



import {
  initialize,
  showMessaging,
} from '@robbywh/react-native-zendesk-messaging';

const HomeScreen = ({ navigation }) => {

  React.useEffect(()=>{
    initialize("eyJzZXR0aW5nc191cmwiOiJodHRwczovL25vZm9ybW9kZW5pbmd1bmFjb21wYWlhLnplbmRlc2suY29tL21vYmlsZV9zZGtfYXBpL3NldHRpbmdzLzAxSDlFMENINFRaTkE2NUhNQzUwRDJBQ1dKLmpzb24ifQ==")
  },[]);

 
  return (
    <View style={styles.container}>
      

        <Chatbot/>
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