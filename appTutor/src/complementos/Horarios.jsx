import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Horarios = () => {
  return (
    <View style={styles.container}>
      <Text>HORARIOS</Text>
      
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

export default Horarios;
