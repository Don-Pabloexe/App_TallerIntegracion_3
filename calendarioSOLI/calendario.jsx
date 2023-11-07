import React, {useState, useEffect} from "react";
import {View, StyleSheet, TouchableOpacity, Text, Modal, TextInput} from 'react-native';
import Calendar from 'react-native-calendars/src/calendar'
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"; 
import { ScrollView } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import español from './españolCALENDAR'

const getUserEmail = async () => {
  try {
    const userEmail = await AsyncStorage.getItem('userEmail');
    if (userEmail !== null) {
      // userEmail contiene el correo electrónico del usuario
      console.log('Correo electrónico del usuario:', userEmail);
      return userEmail;
    }
  } catch (error) {
    console.error('Error al recuperar el correo electrónico:', error);
  }
};

function calendario() {
    const [Seleccion, setSeleccion] = useState({});
    const [selectedDay, setSelectedDay] = useState(''); // El día seleccionado
    const [selectedHour, setSelectedHour] = useState(''); // La hora seleccionada
    const [userEmail, setUserEmail] = useState(null); // Agrega un estado para el correo electrónico
    const [newArticle, setNewArticle] = useState('');
    const [horaDISP, setHoraDISP] = useState('');
    const [horariosDisponibles, setHorariosDisponibles] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newHour, setNewHour] = useState('');
      useEffect(() => {
        const fetchRecursosData = async () => {
          if (selectedDay) { // Verificar que selectedDay no esté vacío
            try {
              const verhoras = collection(db, 'disponibles');
              const recursosQuery = query(
                verhoras,
                where('fecha', '==', selectedDay)
              );
      
              const querySnapshot = await getDocs(recursosQuery);
      
              const recursosData = {}; // Cambiamos a un objeto en lugar de un arreglo
      
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.horas && Array.isArray(data.horas)) {
                  // Verificamos que 'horas' sea un arreglo
                  recursosData[data.fecha] = data.horas;
                }
              });
      
              setHorariosDisponibles(recursosData);
            } catch (error) {
              console.error('Error al obtener datos:', error);
              console.log(selectedDay)
            }
          }
        };
      
        fetchRecursosData();
      }, [selectedDay]);
      
    const guardarevento = async ( date, hora) => {
      const userEmail = await getUserEmail();
      setUserEmail(userEmail);
      try {
        const docRef = await addDoc(collection(db, "solicitudes"), {
          usuario: userEmail,
          fecha: date,
          hora: hora
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    const guardarEventoEnBD = () => {
      // Reemplaza 'eventId' y 'eventDetails' con los valores adecuados
      if (selectedDay && selectedHour) {
          guardarevento(selectedDay, selectedHour);
          alert('Evento guardado con éxito');
          console.log(userEmail, selectedDay, selectedHour, Seleccion)
      } else {
          alert('Debes seleccionar un día y hora válidos');
          console.log(userEmail, selectedDay, selectedHour, Seleccion)
      }
  };
    
    const handleDayChange = (day) => {
        setSelectedDay(day);
        setSelectedHour(''); // Reiniciar la hora seleccionada cuando cambia el día
        
      };
    const handleHourChange = (hour) => {
        setSelectedHour(hour);
      
        
      };
    const presionar = date => {
      // Crear un objeto con la fecha seleccionada como clave
      const selectedDate = {
        [date.dateString]: { selected: true, selectedColor: '#39C7F0' }}
        setSeleccion(selectedDate);
        setSelectedDay(date.dateString);
        
      };
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      };
      
    
    const renderHourSelection = () => {
        if (selectedDay && horariosDisponibles[selectedDay]) {
          return (
            <View>
              <Text style={ {textAlign:'center', padding: 5}}>Selecciona una hora:</Text>
              <ScrollView style={styles.hourScroll}>
              {horariosDisponibles[selectedDay].map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={[
                    styles.hourButton,
                    {
                      backgroundColor:
                        selectedHour === hour ? '#39C7F0' : 'transparent',
                    },
                  ]}
                  onPress={() => handleHourChange(hour)}
                >
                  <Text>{hour}</Text>
                </TouchableOpacity>
              ))}
              </ScrollView>
            </View>
          );
        } else {
          return <Text></Text>;
        }
      };
    
      return (
        <View>
          <Calendar
            style={{ borderRadius: 10, elevation: 4, margin: 10 }}
            onDayPress={presionar}
            markedDates={Seleccion}
          />
       

          {renderHourSelection()}
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.button}>
  <Text style={styles.buttonText}>Agregar Hora</Text>
</TouchableOpacity>
<TouchableOpacity
            onPress={guardarEventoEnBD}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Solicitar Evento</Text>
          </TouchableOpacity>
          </View>
<Modal visible={isModalVisible} transparent animationType="slide">
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Agregar Hora</Text>
    <TextInput
      style={styles.textInput}
      placeholder="Escribe la hora"
      value={selectedHour}
      onChangeText={(text) => setSelectedHour(text)}
    />
    <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
      <Text style={styles.modalButtonText}>Cancelar</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        // Agregar lógica para guardar la nueva hora en la base de datos
        // y luego cerrar el cuadro de diálogo.
        toggleModal();
      }}
      style={styles.modalButton}
    >
      <Text style={styles.modalButtonText}>Guardar</Text>
    </TouchableOpacity>
  </View>
</Modal>
         
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      // ... (otros estilos)
      hourButton: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#39C7F0',
        borderRadius: 5,
        width: 300,
       
      },
      hourScroll: {
        maxHeight: 250, // Ajusta la altura máxima según tus necesidades
        marginBottom: 20,
        marginLeft: '13%'
      },
      button: {
        backgroundColor: '#2e70b8',
        padding: 10,
        margin: 5,
        width: 150,
        height: 40,
        borderRadius: 5,
        position: "relative",
        
      },
      buttonText: {
        color: '#ffffff',
        textAlign: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff'
      },
      textInput: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#ffffff',
      },
      modalButton: {
        backgroundColor: '#2e70b8',
        padding: 10,
        width: 100,
        borderRadius: 5,
        marginHorizontal: 10,
      },
      modalButtonText: {
        color: '#ffffff',
        textAlign: 'center',
      },
      buttonContainer: {
        flexDirection: 'row', // Esto coloca los elementos en una fila
        alignItems: 'center', // Esto alinea verticalmente los botones al centro
        justifyContent: 'center'
      },

    });
export default calendario;