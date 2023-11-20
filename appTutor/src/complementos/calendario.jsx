import React, {useState, useEffect} from "react";
import {View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, FlatList} from 'react-native';
import Calendar from 'react-native-calendars/src/calendar'
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs, query, where, onSnapshot, deleteDoc, doc, } from "firebase/firestore"; 
import { ScrollView } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import español from './españolCALENDAR'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



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
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [workshops, setWorkshops] = useState([]);
    const [advisors, setAdvisors] = useState([]);
    const [selectedAdvisor, setSelectedAdvisor] = useState(null);
    const auth = getAuth();
    const workshopsRef = collection(db, 'workshops');
    const [users, setUsers] = useState([]);
    const [asesores, setAsesores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAsesor, setSelectedAsesor] = useState('')
    const [showButtons, setShowButtons] = useState(true);
    const [buttonsHidden, setButtonsHidden] = useState(false);
    const [mostrarSolicitudes, setMostrarSolicitudes] = useState(false);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const [solicitudesEventos, setSolicitudesEventos] = useState([]);
    const [date, setDate] = useState(new Date());

    const scheduleNotification = async () => {
     
      const now = new Date();
      const timestamp = now.getTime() + 5000; // Notificación después de 5 segundos
  
      const schedulingOptions = {
        content: {
          title: '¡Se ha llegado una nueva solicitud!',
          body: 'solicitud',
        },
        trigger: {
          seconds: 5,
          repeats: false,
        },
      };
      
     
        
     
      await Notifications.scheduleNotificationAsync(schedulingOptions);
      Alert.alert('¡Notificación programada!', `El recordatorio está programado para: ${new Date(timestamp).toString()}`);
      
    };
    const scheduleNotification2 = async () => {
     
      const now = new Date();
      const timestamp = now.getTime() + 5000; // Notificación después de 5 segundos
  
      const schedulingOptions = {
        content: {
          title: '¡Se a enviado una solictud!',
          body: 'solicitud',
        },
        trigger: {
          seconds: 5,
          repeats: false,
        },
      };
      
     
        
     
      await Notifications.scheduleNotificationAsync(schedulingOptions);
      Alert.alert('¡Notificación programada!', `El recordatorio está programado para: ${new Date(timestamp).toString()}`);
      
    }
  



    useEffect(() => {
      const fetchAsesores = async () => {
        try {
          const q = query(collection(db, 'usuarios'), where('cargo', '==', 'asesor'));
          const querySnapshot = await getDocs(q);
          const asesoresList = [];
          querySnapshot.forEach((doc) => {
            // Almacenar el correo electrónico del asesor en la lista de asesores
            asesoresList.push(doc.data().correoElectronico);
          });
          // Almacenar la lista de asesores en el estado correspondiente
          setAsesores(asesoresList);
        } catch (error) {
          console.error('Error al obtener la lista de asesores:', error);
        }
      };
  
      fetchAsesores();
    }, []);

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

      
      
      useEffect(() => {
        const solicitudesss = async () => {
          const userEmail = await getUserEmail();
          setUserEmail(userEmail);
          if (mostrarSolicitudes) {
            try {
              const verSolicitudes = collection(db, 'solicitudes');
              const querySnapshot = await getDocs(verSolicitudes);
      
              const solicitudes = [];
              
              
      
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Agrega todas las propiedades necesarias de la solicitud
                if (data.asesor === userEmail) {
                 

                const solicitud = {
                  id: doc.id, // Puedes utilizar el ID del documento como identificador único
                  usuario: data.usuario,
                  asesor: data.asesor,
                  fecha: data.fecha,
                  hora: data.hora,
                  // Agrega más atributos según sea necesario
                };
      
                solicitudes.push(solicitud);

                
              }
              
              });
              setSolicitudesEventos(solicitudes);
              scheduleNotification();
              // Ahora tienes un arreglo de todas las solicitudes con todos sus datos
              console.log('Solicitudes:', solicitudes);
              
            } catch (error) {
              console.error('Error al obtener datos:', error);
            }
            
          }
        };
      
        solicitudesss();
      }, [mostrarSolicitudes]);

      useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserRole(user.displayName);
                setUserName(user.email.split('@')[0]);
            }
        });

        const unsubscribeWorkshops = onSnapshot(workshopsRef, (querySnapshot) => {
            const workshopList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWorkshops(workshopList);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeWorkshops();
        };
    }, []); 


    const guardarevento = async ( date, hora) => {
      const userEmail = await getUserEmail();
      setUserEmail(userEmail);
      try {
        const docRef = await addDoc(collection(db, "solicitudes"), {
          usuario: userEmail,
          asesor: selectedAsesor,
          fecha: date,
          hora: hora,
         
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
          scheduleNotification2();
          alert('Evento guardado con éxito');
          console.log(userEmail, selectedDay, selectedHour, Seleccion)
      } else {
          alert('Debes seleccionar un día y hora válidos');
          console.log(userEmail, selectedDay, selectedHour, Seleccion)
      }
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
      const toggleButtons = () => {
        setShowButtons(!showButtons);
        setButtonsHidden(true); // Marca los botones como ocultos
      };  
      

      const mostrarDetalleSolicitud = (solicitud) => {
        setSolicitudSeleccionada(solicitud);
        // Mostrar la ventana emergente o modal
        setMostrarSolicitudes(true);
      };
      const ListaSolicitudes = () => {
        return (
          <View style={styles.listaSolicitudesContainer}>
            <Text style={styles.titulo}>Solicitudes de Evento</Text>
            <ScrollView style={styles.hourScroll}>
              {solicitudesEventos.map((solicitud) => (
                <TouchableOpacity
                  key={solicitud.id}
                  style={styles.solicitudItem}
                  onPress={() => mostrarDetalleSolicitud(solicitud)}
                >
                  <Text>Usuario: {solicitud.usuario}</Text>
                  <Text>Asesor: {solicitud.asesor}</Text>
                  <Text>Fecha: {solicitud.fecha}</Text>
                  <Text>Hora: {solicitud.hora}</Text>
                  {/* Agrega más detalles si es necesario */}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
      };
      
      const DetalleSolicitud = ({ solicitud }) => {
        const aceptarSolicitud = async () => {
          console.log('buenassss')
          try {
            // Agregar la solicitud a la colección 'solicitudesaceptadas'
            await addDoc(collection(db, 'solicitudesaceptadas'), {
              usuario: solicitud.usuario,
              asesor: solicitud.asesor,
              fecha: solicitud.fecha,
              hora: solicitud.hora,
            });
      
            // Eliminar la solicitud de la colección 'solicitudes'
            await deleteDoc(doc(db, 'solicitudes', solicitud.id));
      
            // Cerrar la ventana de detalles de la solicitud
            setMostrarSolicitudes(false);
          } catch (error) {
            console.error('Error al aceptar la solicitud:', error);
          }
        };
      
        const rechazarSolicitud = async () => {
          try {
            // Eliminar la solicitud de la colección 'solicitudes'
            await deleteDoc(doc(db, 'solicitudes', solicitud.id));
      
            // Cerrar la ventana de detalles de la solicitud
            setMostrarSolicitudes(false);
          } catch (error) {
            console.error('Error al rechazar la solicitud:', error);
          }
        };
      
        return (
          <Modal visible={mostrarSolicitudes} transparent animationType="slide">
            
            <View style={styles.detalleContainer}>
              <Text style={styles.titulo}>Detalles de la Solicitud</Text>
              <Text style = {styles.detallestext}>Asesor: {solicitud.usuario}</Text>
              <Text style = {styles.detallestext}>Asesor: {solicitud.asesor}</Text>
              <Text style = {styles.detallestext}>Fecha: {solicitud.fecha}</Text>
              <Text style = {styles.detallestext}>Hora: {solicitud.hora}</Text>
      
              {/* Agregar botones de Aceptar y Rechazar aquí */}
              <View style={styles.botonesContainer}>
                <TouchableOpacity onPress={aceptarSolicitud} style={styles.aceptarButton}>
                  <Text style={styles.aceptarButtonText}>Aceptar</Text>
                </TouchableOpacity>
      
                <TouchableOpacity onPress={rechazarSolicitud} style={styles.rechazarButton}>
                  <Text style={styles.rechazarButtonText}>Rechazar</Text>
                </TouchableOpacity>
              </View>
      
              <TouchableOpacity
                onPress={() => setMostrarSolicitudes(false)}
                style={styles.cerrarButton}
              >
                <Text style={styles.cerrarButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        );
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
          
          {userRole === 'docente' && (
            <View>
              {showButtons &&(
              <View>
             {asesores.map((asesor, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {

          setSelectedAsesor(asesor)
          console.log(asesor)
          toggleButtons()
          
        }}
        style={styles.button} // Aplica estilos a cada botón
      >
        <Text>{asesor}</Text>
      </TouchableOpacity>
    ))}
    </View>
      )}
            {selectedAsesor && (
              <View>
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
              </View>
            )}
          </View>
        )}
          
        

          
          {userRole === 'asesor' && (
            
            <View style={styles.container}>
             
            <TouchableOpacity
              onPress={() => setMostrarSolicitudes(!mostrarSolicitudes)}
              style={styles.iconContainer}
              
            >
              <Icon name="bell" size={30} color="#000" />
            </TouchableOpacity>
            
            {mostrarSolicitudes && <ListaSolicitudes />}
            {solicitudSeleccionada && (
            <DetalleSolicitud solicitud={solicitudSeleccionada} />
            )}
            {console.log(solicitudesEventos[0])}
           

           
          </View>
          )}

          
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
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconContainer: {
        marginBottom: 20,
      },
      listaSolicitudesContainer: {
        padding: 10,
      },
      solicitudItem: {
        backgroundColor: '#EFEFEF',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
      },
      detalleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      cerrarButton: {
        backgroundColor: '#2e70b8',
        padding: 10,
        width: 100,
        borderRadius: 5,
        marginHorizontal: 10,
      },
      cerrarButtonText: {
        color: '#ffffff',
        textAlign: 'center',
      },
      detalleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff'
      },
      botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      },
      aceptarButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        margin: 10,
        borderRadius: 5,
      },
      aceptarButtonText: {
        color: 'white',
      },
      rechazarButton: {
        backgroundColor: '#F44336',
        padding: 10,
        margin: 10,
        borderRadius: 5,
      },
      rechazarButtonText: {
        color: 'white',
      },
      cerrarButton: {
        backgroundColor: '#2e70b8',
        padding: 10,
        width: 100,
        borderRadius: 5,
        marginHorizontal: 10,
      },
      cerrarButtonText: {
        color: 'white',
        textAlign: 'center',
      },
      detallestext: {
        color: '#ffffff'
      }
    });
export default calendario;