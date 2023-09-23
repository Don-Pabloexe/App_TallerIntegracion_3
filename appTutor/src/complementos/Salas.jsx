import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Detalles</Text>
      <Image style = {styles.logo} source={require('./../img/libreta.png')}/>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf:'center',
  },
  container: {
    flex: 1,
    alignContent: "center",
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#EAEAEA"
  }
 
});

export default DetailsScreen;
