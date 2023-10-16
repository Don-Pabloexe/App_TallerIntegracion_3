import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { firebase_AUTH } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('./../img/logo_uct.png');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
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
            await AsyncStorage.setItem('userEmail', email);  // Almacena el email en AsyncStorage
            navigation.navigate('accesoexitoso');
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
            console.log(response);
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
});

export default LoginScreen;
