import { StyleSheet } from 'react-native';
import Info from './../img/info.png'
import Sala from './../img/18625.png';
import Tutor from './../img/tutores.png';
import Horario from './../img/libreta.png';
const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 10,
    backgroundColor: "#EAEAEA",
    
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

const HomeStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#96d0fa',
    borderRadius: 10,
    margin: 50,
    width: 100, 
    height: 100,
    shadowColor: 'rgba(0, 0, 0, 0.5)', // Color de la sombra
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.5, // Opacidad de la sombra
    shadowRadius: 3, // Radio de la sombra
    elevation: 5, // Efecto de elevación en Android
  },
  buttoninfo:{
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1990e6',
    borderRadius: 100,
    margin: 10,
    width: 100, 
    height: 100

  },
  image: {
    width: '50%',
    height: '50%',
  
  },
  info:{
    width: 20,
    height:20, 
  }
});
const styl = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Ocupa todo el espacio disponible
    resizeMode: 'cover', // Ajusta la imagen para cubrir todo el espacio
    width: 330,
    height: 250,
    position: 'absolute',
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    opacity: 0.4,
    zIndex: -1
  },
});

export { styl, CommonStyles, HomeStyles, Info, Tutor, Sala, Horario};