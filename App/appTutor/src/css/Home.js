import { StyleSheet } from 'react-native';
import info from './../img/info.png'
import sala from './../img/18625.png';
import tutor from './../img/tutores.png';
import horario from './../img/libreta.png';
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    flexDirection: 'down',
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#FFFDED",
    
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

const homeStyles = StyleSheet.create({
  button: {
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#96d0fa',
    borderRadius: 300,
    margin: 10,
    width: 100, 
    height: 100
  },
  buttoninfo:{
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1990e6',
    borderRadius: 300,
    margin: 10,
    width: 100, 
    height: 100

  },
  image: {
    width: 50,
    height: 50,
  
  },
  info:{
    width: 20,
    height:20, 
  }
});

export { commonStyles, homeStyles, info, tutor, sala, horario};