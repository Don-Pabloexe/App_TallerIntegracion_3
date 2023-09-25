import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import LoginScreen from './login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { barratop } from './../css/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonStyles, HomeStyles, Info, Tutor, Sala, Horario, blog, recursos, chatbot } from './../css/Home';

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
    
      <Tab.Navigator initialRouteName="Home" screenOptions = {{tabBarStyle: { position: 'absolute', height: 60} ,}}>       
        <Tab.Screen name="Home" component={HomeScreen}
          options={({ route }) => ( {
          tabBarLabel: false,
          headerTitleAlign: 'center',
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="home" color={'#1C74AA'} size={size} />       
          ),
        })}/>

        <Tab.Screen name = "Salas" component={HomeScreen}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "door" color={'#1C74AA'} size={size} />       
          ),
        })}/>

        <Tab.Screen name = "Tutores" component={HomeScreen}
          options={({ route }) => ( {
          tabBarLabel: false,
          headerTitleAlign: 'center',
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "school-outline" color={'#1C74AA'} size={size} />       
          ),
        })}/>

        <Tab.Screen name = "Horas" component={HomeScreen}
          options={({ route }) => ( {
          tabBarLabel: false,  
          headerTitleAlign: 'center',
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "book-open-page-variant-outline" color={'#1C74AA'} size={size} />       
          ),
        })}/>

        <Tab.Screen name = "Blog" component={HomeScreen}
          options={({ route }) => ( {
          tabBarLabel: false,
          headerTitleAlign: 'center',
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "account-group" color={'#1C74AA'} size={size} />       
          ),
        })}/>

        <Tab.Screen name = "Recursos" component={HomeScreen}
          options={({ route }) => ( {
          tabBarLabel: false, 
          headerTitleAlign: 'center',
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color, // Cambia el color de fondo del encabezado
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "bookshelf" color={'#1C74AA'} size={size} />       
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
    left: 200,
    fontSize: 26,
  },
});

export default Acceder;
