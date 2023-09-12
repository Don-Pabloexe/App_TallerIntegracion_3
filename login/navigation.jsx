import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import DetailsScreen from './Salas';
import Tutores from './Tutores';
import Horarios from './Horarios';
import { Image, View, Text, StyleSheet } from 'react-native';
import LoginScreen from './login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const color = '#1C74AA'
const SECONDcolor = "#FFF8C8"
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Acceder = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="UCTutor"
          component={LoginScreen}
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
                    width: 30,
                    height: 30,
                    tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                  }}
                />
                <Text style={{ color: focused ? color : 'gray' }}>Inicio</Text>
              </View>
            ),
          })}
        />
        <Stack.Screen name="accesoexitoso" component={AppNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const AppNavigator = () => {
  return (

  
      <Tab.Navigator initialRouteName="Home" >
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
                  width: 30,
                  height: 30,
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
                  width: 30,
                  height: 30,
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
                  width: 30,
                  height: 30,
                  tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                }}
              />
              <Text style={{ color: focused ? color : 'gray' }}>Tutores</Text>
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
                  width: 30,
                  height: 30,
                  tintColor: focused ? color : 'gray', // Cambiar el color de la imagen cuando esté seleccionada
                }}
              />
              <Text style={{ color: focused ? color : 'gray' }}>Horas</Text>
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
