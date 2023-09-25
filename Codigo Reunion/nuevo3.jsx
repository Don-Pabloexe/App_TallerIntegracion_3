import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList, Picker } from 'react-native';

const destinatariosPredeterminados = ['Asesor 1', 'Asesor 2', 'Asesor 3'];

const MeetingRequestScreen = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [meetingDateTime, setMeetingDateTime] = useState('');

  const handleMeetingRequest = () => {
    if (selectedRecipient.trim() === '' || subject.trim() === '' || meetingDateTime.trim() === '') {
      Alert.alert('Campos Incompletos', 'Por favor, completa todos los campos para enviar la solicitud.');
    } else {
      const newRequest = {
        id: Date.now().toString(),
        recipient: selectedRecipient,
        subject,
        meetingDateTime,
      };
      setMeetingRequests([...meetingRequests, newRequest]);
      setRecipient('');
      setSubject('');
      setSelectedRecipient('');
      setMeetingDateTime('');
      Alert.alert('Solicitud Enviada', 'Tu solicitud de reunión ha sido enviada con éxito.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar Reunión</Text>
      <Picker
        selectedValue={selectedRecipient}
        onValueChange={(itemValue) => setSelectedRecipient(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un destinatario" value="" />
        {destinatariosPredeterminados.map((destinatario, index) => (
          <Picker.Item key={index} label={destinatario} value={destinatario} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Asunto"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Día y Hora de la Reunión (Ejemplo: Lunes 10:00 AM)"
        value={meetingDateTime}
        onChangeText={(text) => setMeetingDateTime(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleMeetingRequest}>
        <Text style={styles.buttonText}>Enviar Solicitud</Text>
      </TouchableOpacity>

      {/* Lista de solicitudes de reunión */}
      <Text style={styles.title}>Solicitudes de Reunión</Text>
      <FlatList
        data={meetingRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text>Destinatario: {item.recipient}</Text>
            <Text>Asunto: {item.subject}</Text>
            <Text>Fecha y Hora de la Reunión: {item.meetingDateTime}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  requestItem: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});

export default MeetingRequestScreen;
