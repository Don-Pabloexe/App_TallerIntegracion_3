
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import DetailsScreen from './Salas';
import Tutores from './Tutores';
import Horarios from './Horarios';
import RecursosScreen from './recursos';
import BlogScreen from './Blog';
import Chatbot from './chatbot';
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import WorkshopRegistrationScreen from './Nuevo'

import calendario from './calendario';

import LoginScreen from './login';
import AccountDetails from './accountDetails'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { barratop } from './../css/navigation'

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const color = '#1C74AA'
const SECONDcolor = "#FFF8C8"
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const tamaño = 30;

const CustomHeader = () => {
  return (
      <View style = {barratop.container}>
       <ImageBackground source = {require('./../img/logo.png')} style = {barratop.backgroundImage}resizeMode='cover'>
       </ImageBackground>
      </View>
  );
};

const HeaderAccountDetails = () => {
  return (
      <View style = {barratop.container2}>
      </View>
  );
};

const Acceder = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      
      <Stack.Screen
        name = "Login"
        component = {LoginScreen}
        options={{
          headerTitle: () => <CustomHeader />,
        }}
      />

      <Stack.Screen
        name = "AccountDetail"
        component = {AccountDetails}
        options = {{
          headerTitle: () => <HeaderAccountDetails />,
        }}
      />

      <Stack.Screen name = "accesoexitoso" component = {AppNavigator} options = {{ headerShown: false }}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Usuario Anónimo');

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleGoAccountDetail = () => {
    navigation.navigate('AccountDetail');
  };

  const fetchEmail = async () => {
    const storedEmail = await AsyncStorage.getItem('userEmail');

    if (storedEmail) {
      const usernamePart = storedEmail.split('@')[0]; // Toma solo la parte antes del '@'
      setUsername(usernamePart);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []); 


  return (
    
      <Tab.Navigator initialRouteName = "Home" screenOptions = {{tabBarStyle: {height: 75, backgroundColor: color}}}>   
        <Tab.Screen name = "Home" component = {HomeScreen} 
          options = {({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = 'home-outline' color = 'white' size = {tamaño} />       
          ),
          
          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoAccountDetail}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Salas" component = {DetailsScreen} screenOptions = {{tabBarStyle: {height: 75, backgroundColor: color}}}   
          options = {({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "door" color = {'white'} size = {tamaño} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Tutores" component={Tutores}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "school-outline" color = {'white'} size = {tamaño} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Horarios" component = {Horarios}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "book-open-page-variant-outline" color = {'white'} size = {tamaño} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Blog" component = {BlogScreen}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "account-group" color = {'white'} size = {tamaño} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Recursos" component = {RecursosScreen}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "bookshelf" color = {'white'} size = {tamaño} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "ChatBot" component = {Chatbot}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "robot-outline" color = {'white'} size = {tamaño} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Talleres" component = {WorkshopRegistrationScreen}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "robot-outline" color = {'white'} size = {tamaño} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        

<Tab.Screen name = "Calendario" component = {calendario}
          options={({ route }) => ( {
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          backgroundColor: SECONDcolor,
          headerStyle: {
          backgroundColor: color,
          height: 80
          },
          headerTintColor: 'white',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#3690c7',

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "robot-outline" color = {'white'} size = {tamaño} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {tamaño} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

      </Tab.Navigator>    
      
  );
};

const styles = StyleSheet.create({
  
  conjunto: {
    flexDirection: 'row', alignItems: 'center', left: 100, color: 'black',
  },

  label: {
    color: 'white',
    fontSize: 12,
    alignContent: 'center',
    alignItems: 'center'
  },

  titulo: {
    fontSize: 26,
  },
});

export default Acceder;