import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, Text, Modal, Picker} from 'react-native';
import Calendar from 'react-native-calendars/src/calendar'

function calendario() {
    const [Seleccion, setSeleccion] = useState({});
    const [selectedDay, setSelectedDay] = useState(''); // El día seleccionado
    const [selectedHour, setSelectedHour] = useState(''); // La hora seleccionada
    const availableHours = {
        '2023-10-25': ['09:00 AM', '10:00 AM', '11:00 AM'],
        '2023-10-26': ['02:00 PM', '03:00 PM', '04:00 PM'],
        // Agrega más fechas y horas según tus necesidades
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
    
    
    return (
      
      <View>
        <Calendar
        style={{ borderRadius: 10, elevation: 4, margin: 40 }}
        onDayPress={presionar}
        markedDates={Seleccion}
      />

      {selectedDay && (
        <Picker
          selectedValue={selectedHour}
          onValueChange={(itemValue) => handleHourChange(itemValue)}
        >
          <Picker.Item label="Selecciona una hora" value="" />
          {availableHours[selectedDay].map((hour) => (
            <Picker.Item key={hour} label={hour} value={hour} />
          ))}
        </Picker>
      )}

      {selectedHour && (
        <Text>Has seleccionado la hora: {selectedHour}</Text>
      )}
    </View>
    );
      }
export default calendario;