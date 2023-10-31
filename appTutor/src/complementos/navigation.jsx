
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
import Nuevo from './Nuevo';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const color = '#1C74AA'
const SECONDcolor = "#FFF8C8"
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const tamaño = 30;

const CustomHeader = () => {
  return (
      <View style={barratop.container}>
       <ImageBackground source = {require('./../img/logo.png')} style = {barratop.backgroundImage}resizeMode='cover'>
       </ImageBackground>
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
        <Stack.Screen name="accesoexitoso" component={AppNavigator} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  return (
    
      <Tab.Navigator initialRouteName = "Home" screenOptions = {{tabBarStyle: {height: 75, backgroundColor: color}}}>   
        <Tab.Screen name = "Home" component = {HomeScreen}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = 'home-outline' color = 'white' size = {tamaño} />       
          ),
        })}/>

        <Tab.Screen name = "Salas" component={DetailsScreen}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "door" color = {'white'} size = {tamaño} />       
          ),
        })}/>

        <Tab.Screen name = "Tutores" component={Tutores}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "school-outline" color = {'white'} size = {tamaño} />       
          ),
        })}/>

        <Tab.Screen name = "Horarios" component = {Horarios}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "book-open-page-variant-outline" color = {'white'} size = {tamaño} />       
          ),
        })}/>

        <Tab.Screen name = "Blog" component = {BlogScreen}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "account-group" color = {'white'} size = {tamaño} />       
          ),
        })}/>

        <Tab.Screen name = "Recursos" component = {RecursosScreen}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "bookshelf" color = {'white'} size = {tamaño} />       
          ),
        })}/>

        <Tab.Screen name = "ChatBot" component = {Chatbot}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "robot-outline" color = {'white'} size = {tamaño} />       
          ),
        })}/>

<Tab.Screen name = "Talleres" component = {Nuevo}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "robot-outline" color = {'white'} size = {tamaño} />       
          ),
        })}/>

      </Tab.Navigator>    
      
  );
};

const styles = StyleSheet.create({
  
  conjunto:{
    flexDirection: 'row', alignItems: 'center', left: 100, color: 'black',
  },

  titulo:{
    fontSize: 26,
  },
});

export default Acceder;