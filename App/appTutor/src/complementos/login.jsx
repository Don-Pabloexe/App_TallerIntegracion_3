import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, Modal, Pressable } from 'react-native';
import { firebase_AUTH, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc} from "firebase/firestore"; 
const image = require('./../img/logo_uct.png');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('docente');
    const [modalVisible, setModalVisible] = useState(false);
    const auth = firebase_AUTH;

    const isUctEmail = (email) => {
        return email.endsWith('@alu.uct.cl');
    };

    const signIn = async () => {
        setLoading(true);

        if (!isUctEmail(email)) {
            alert('Por favor, ingrese un correo electrónico de la UCT.');
            setLoading(false);
            return;
        }

        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            // Verifica si el cargo almacenado en el perfil coincide con el cargo seleccionado al registrarse
            if (response.user.displayName === selectedRole) {
                await AsyncStorage.setItem('userEmail', email);
                navigation.navigate('accesoexitoso');
            } else {
                alert('No tiene permiso para iniciar sesión con este cargo.');
            }
        } catch (error) {
            console.log(error);
            alert('Datos de inicio de sesión incorrectos');
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);

        if (!isUctEmail(email)) {
            alert('Por favor, ingrese un correo electrónico de la UCT.');
            setLoading(false);
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            // Agrega el campo "role" al perfil del usuario
            await updateProfile(response.user, { displayName: selectedRole });
            
            await addDoc(collection(db, 'usuarios'), {
               
                correoElectronico: email,
                cargo: selectedRole
              });
            alert('Se registró correctamente');
        } catch (error) {
            console.log(error);
            alert('El email que intenta registrar ya se encuentra en uso');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />

                <Text style={styles.label}>Contraseña:</Text>
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    style={styles.input}
                    placeholder="Contraseña"
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Seleccionar Cargo:</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedRole('docente');
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.modalOption}>Docente</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedRole('asesor');
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.modalOption}>Asesor</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Seleccionar Cargo</Text>
                </TouchableOpacity>

                {loading ? (
                    <ActivityIndicator size="large" color="#000ff" />
                ) : (
                    <>
                        <TouchableOpacity style={styles.button} onPress={signIn}>
                            <Text style={styles.buttonText}>Iniciar sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={signUp}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#258FD0',
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 16,
    paddingHorizontal: 8,
    height: 40,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#258FD0',
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalOption: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LoginScreen;