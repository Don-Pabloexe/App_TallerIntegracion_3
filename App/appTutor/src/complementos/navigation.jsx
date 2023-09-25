import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import DetailsScreen from './Salas';
import Tutores from './Tutores';
import Horarios from './Horarios';
import RecursosScreen from './recursos';
import BlogScreen from './Blog';
import Chatbot from './chatbot';
import { Image, View, Text, StyleSheet, ImageBackground } from 'react-native';
import LoginScreen from './login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {barratop} from './../css/navigation'
const color = '#1C74AA'
const SECONDcolor = "#FFF8C8"
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeader = () => {
  return (
      <View style={barratop.container}>
       <ImageBackground
      source={require('./../img/logo.png')}
      style={barratop.backgroundImage}
      resizeMode='cover'
    ></ImageBackground>
      </View>
  );
};

const Acceder = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => <CustomHeader />,
        }}
      />
        <Stack.Screen name="accesoexitoso" component={AppNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  return (

      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          backgroundColor: SECONDcolor,
          headerStyle: {
            backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./../img/18625.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                }}
              />
              <Text style={{ color: focused ? color : 'gray' }}>Inicio</Text>
            </View>
          ),
        })}/>
        <Tab.Screen name="Salas" component={DetailsScreen}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarLabel: '',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./../img/SalaLogo.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                }}
              />
              <Text style={{ color: focused ? color : 'gray' }}>Salas</Text>
            </View>
          ),
        })}/>
        
        <Tab.Screen name="Tutores" component={Tutores}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarLabel: '',
          headerStyle: {
            backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./../img/tutores.png')}
                style={{
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  
                  bottom: 1,
                  tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                }}
              />
              <Text style={{ color: focused ? color : 'gray', top: 16 }}>Tutores</Text>
            </View>
          ),
        })}/>
        <Tab.Screen name="Horarios" component={Horarios}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarLabel: '',
          headerStyle: {
            backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./../img/libreta.png')}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                }}
              />
              <Text style={{ color: focused ? color : 'gray', top: 17 }}>Horas</Text>
            </View>
          ),
        })}/>
        <Tab.Screen name="Blog" component={BlogScreen}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarLabel: '',
          headerStyle: {
            backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./../img/blog.png')}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                }}
              />
              <Text style={{ color: focused ? color : 'gray', top: 17 }}>Blog</Text>
            </View>
          ),
        })}/>
        <Tab.Screen name="recursos" component={RecursosScreen}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarLabel: '',
          headerStyle: {
            backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./../img/recursos.png')}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                }}
              />
              <Text style={{ color: focused ? color : 'gray', top: 17 }}>Recursos</Text>
            </View>
          ),
        })}/>
        <Tab.Screen name="Chatbot" component={Chatbot}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarLabel: '',
          headerStyle: {
            backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./../img/chatbot.png')}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  
                }}
              />
              <Text style={{ color: focused ? color : 'gray', top: 17 }}>Chatbot</Text>
            </View>
          ),
        })}/>
      </Tab.Navigator>
      

  );
};
const styles = StyleSheet.create({
  conjunto:{
    flexDirection: 'row', alignItems: 'center', left: 100 
  },
  titulo:{
    left: 200,
    fontSize: 26
  },
});

export default Acceder;
