import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { onSnapshot, query, orderBy, doc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkshopRegistrationScreen = () => {
    const [workshops, setWorkshops] = useState([]);
    const [username, setUsername] = useState('Usuario Anónimo');

  useEffect(() => {
    const fetchUsername = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        const usernamePart = storedEmail.split('@')[0];
        setUsername(usernamePart);
      }
    };

    fetchUsername();
    addDefaultWorkshops();

    const unsubscribe = onSnapshot(
      query(collection(db, 'workshops'), orderBy('time', 'asc')),
      (snapshot) => {
        const fetchedWorkshops = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setWorkshops(fetchedWorkshops);
      }
    );

    return () => unsubscribe();
  }, []);

  const addDefaultWorkshops = async () => {
    const workshopCollection = collection(db, 'workshops');
    const snapshot = await getDocs(workshopCollection);

    if (snapshot.empty) {
      const defaultWorkshops = [
        {
          title: 'Taller 1',
          description: 'Descripción del Taller 1',
          lugar: 'Sala A',
          fecha: '10/11/2023',
          hora: '10:00 AM',
          asesor: 'Dr. Juan Pérez',
          timestamp: new Date(),
          participants: []
        },
        {
          title: 'Taller 2',
          description: 'Descripción del Taller 2',
          lugar: 'Sala B',
          fecha: '12/11/2023',
          hora: '3:00 PM',
          asesor: 'Dra. Maria Rodríguez',
          timestamp: new Date(),
          participants: []
        },
      ];

      defaultWorkshops.forEach(async workshop => {
        await addDoc(workshopCollection, workshop);
      });
    }
  };

  const registerForWorkshop = async (workshopId) => {
    const workshopRef = doc(db, 'workshops', workshopId);
    const workshop = workshops.find((workshop) => workshop.id === workshopId);

    if (!workshop.participants) {
      workshop.participants = [];
    }

    if (!workshop.participants.includes(username)) {
      workshop.participants.push(username);
      await updateDoc(workshopRef, {
        participants: workshop.participants,
      });
      alert('Te has inscrito exitosamente!');
    } else {
      alert('Ya estás inscrito en este taller.');
    }
  };

  const unregisterFromWorkshop = async (workshopId) => {
    const workshopRef = doc(db, 'workshops', workshopId);
    const workshop = workshops.find((workshop) => workshop.id === workshopId);

    if (workshop.participants && workshop.participants.includes(username)) {
      const index = workshop.participants.indexOf(username);
      workshop.participants.splice(index, 1);
      await updateDoc(workshopRef, {
        participants: workshop.participants,
      });
      alert('Has sido desinscrito del taller!');
    } else {
      alert('No estás inscrito en este taller.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Talleres Formativos</Text>
      <FlatList
        data={workshops}
        renderItem={({ item }) => (
          <View style={styles.workshopContainer}>
            <Text style={styles.workshopTitle}>{item.name}</Text>
            <Text style={styles.workshopDescription}>{item.description}</Text>
            <Text style={styles.workshopDetails}>Lugar: {item.location}</Text>
            <Text style={styles.workshopDetails}>Fecha: {item.day}</Text>
            <Text style={styles.workshopDetails}>Hora: {item.time}</Text>
            <Text style={styles.workshopDetails}>Asesor: {item.advisorName}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => registerForWorkshop(item.id)}>
                <Text style={styles.registerButton}>Inscribirme</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => unregisterFromWorkshop(item.id)}>
                <Text style={styles.unregisterButton}>Desinscribirme</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.participantsTitle}>Participantes:</Text>
            <ScrollView style={styles.participantsList}>
              {item.participants && item.participants.map((participant, index) => (
                <Text key={index} style={styles.participant}>{participant}</Text>
              ))}
            </ScrollView>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  workshopContainer: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  workshopTitle: {
    fontSize: 18,
    color: '#333',
  },
  workshopDescription: {
    fontSize: 16,
    marginTop: 8,
    color: '#666',
  },
  workshopDetails: {
    fontSize: 14,
    marginTop: 6,
    color: '#444',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  registerButton: {
    color: '#007AFF',
  },
  unregisterButton: {
    color: '#FF0000',
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  participantsList: {
    maxHeight: 80,
    marginTop: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 8,
  },
  participant: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default WorkshopRegistrationScreen;
