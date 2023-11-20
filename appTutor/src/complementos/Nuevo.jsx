import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc, onSnapshot, doc, updateDoc } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const WorkshopScreen = ({ navigation }) => {
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [workshops, setWorkshops] = useState([]);

    const [workshopName, setWorkshopName] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');
    const [location, setLocation] = useState('');
    const [advisorName, setAdvisorName] = useState('');

    const auth = getAuth();
    const workshopsRef = collection(db, 'workshops');

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

    const addWorkshop = async () => {
        if (workshopName && time && day && location && advisorName) {
            const newWorkshopData = {
                name: workshopName,
                time,
                day,
                location,
                advisorName,
                enrolled: []
            };
            await addDoc(workshopsRef, newWorkshopData);
            setWorkshopName('');
            setTime('');
            setDay('');
            setLocation('');
            setAdvisorName('');
        } else {
            alert('Por favor, llene todos los campos.');
        }
    };

    const registerForWorkshop = async (workshop) => {
        if (!workshop.enrolled.includes(userName)) {
            const workshopDoc = doc(db, 'workshops', workshop.id);
            await updateDoc(workshopDoc, {
                enrolled: [...workshop.enrolled, userName]
            });
            alert(`Te has inscrito en el taller: ${workshop.name}`);
        } else {
            alert('Ya estás inscrito en este taller.');
        }
    };

    const unregisterFromWorkshop = async (workshop) => {
        if (workshop.enrolled.includes(userName)) {
            const updatedEnrolledList = workshop.enrolled.filter(docente => docente !== userName);
            const workshopDoc = doc(db, 'workshops', workshop.id);
            await updateDoc(workshopDoc, {
                enrolled: updatedEnrolledList
            });
            alert(`Has anulado tu inscripción al taller: ${workshop.name}`);
        } else {
            alert('No estás inscrito en este taller.');
        }
    };

    return (
        <View style={styles.container}>
            {userRole === 'asesor' && (
                <View>
                    <TextInput style={styles.input} placeholder="Nombre del taller" value={workshopName} onChangeText={setWorkshopName} />
                    <TextInput style={styles.input} placeholder="Hora" value={time} onChangeText={setTime} />
                    <TextInput style={styles.input} placeholder="Día" value={day} onChangeText={setDay} />
                    <TextInput style={styles.input} placeholder="Lugar" value={location} onChangeText={setLocation} />
                    <TextInput style={styles.input} placeholder="Nombre del asesor a cargo" value={advisorName} onChangeText={setAdvisorName} />
                    <Button title="Agregar taller" onPress={addWorkshop} />
                </View>
            )}

            <FlatList 
                data={workshops}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.workshopItem}>
                        <Text style={styles.workshopDetail}>Taller: {item.name}</Text>
                        <Text style={styles.workshopDetail}>Hora: {item.time}</Text>
                        <Text style={styles.workshopDetail}>Día: {item.day}</Text>
                        <Text style={styles.workshopDetail}>Lugar: {item.location}</Text>
                        <Text style={styles.workshopDetail}>Asesor: {item.advisorName}</Text>
                        <Text style={styles.workshopDetail}>Inscritos: {item.enrolled.join(', ')}</Text>
                        
                        {userRole === 'docente' && (
                            <View style={styles.docenteActions}>
                                <TouchableOpacity style={styles.registerButton} onPress={() => registerForWorkshop(item)}>
                                    <Text style={styles.registerText}>Inscribirse</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.unregisterButton} onPress={() => unregisterFromWorkshop(item)}>
                                    <Text style={styles.unregisterText}>Anular Inscripción</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7'
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    workshopItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1
    },
    workshopDetail: {
        marginBottom: 5
    },
    docenteActions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    registerButton: {
        margin: 5,
        padding: 5,
        backgroundColor: '#4CAF50',
        borderRadius: 5
    },
    unregisterButton: {
        margin: 5,
        padding: 5,
        backgroundColor: '#FF5722',
        borderRadius: 5
    },
    registerText: {
        color: '#fff'
    },
    unregisterText: {
        color: '#fff'
    }
});

export default WorkshopScreen;


