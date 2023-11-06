
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
import Workshop from './Nuevo';
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

import { useTheme, ThemeProvider } from './ThemeContext';

import LoginScreen from './login';
import AccountDetails from './accountDetails'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { barratop } from './../css/navigation'

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeader = () => {
  
  return (
      <View style = {barratop.container}>
       <ImageBackground source = {require('./../img/logo.png')} style = {barratop.backgroundImage} resizeMode = 'cover'>
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
  const { isDarkTheme } = useTheme();

  const NavBarBottomStyle = {
    tabBarActiveBackgroundColor: isDarkTheme ? '#797c82' : '#3690c7',

    tabBarStyle: {
      backgroundColor: isDarkTheme ? '#535559' : '#1C74AA',
      height: 75
    },
    
  };

  return (
      <Stack.Navigator initialRouteName = "Login">
        <Stack.Screen
          name = "Login"
          component = {LoginScreen}
          options = {{
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
  );
};

const AppNavigator = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Usuario Anónimo');
  const { isDarkTheme } = useTheme();

  const NavBarBottomStyle = {
    tabBarActiveBackgroundColor: isDarkTheme ? '#797c82' : '#3690c7',
    backgroundColor: isDarkTheme ? '#535559' : '#1C74AA',
    headerTitleAlign: 'center',
    tabBarShowLabel: false,
  
    headerTintColor: 'white',
    tabBarLabel: '',

    tabBarStyle: {
      backgroundColor: isDarkTheme ? '#535559' : '#1C74AA',
      height: 75
    },
    
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleGoAccountDetail = () => {
    navigation.navigate('AccountDetail');
  };

  const fetchEmail = async () => {
    const storedEmail = await AsyncStorage.getItem('userEmail');

    if (storedEmail) {
      const usernamePart = storedEmail.split('@')[0];
      setUsername(usernamePart);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []); 


  return (
      <Tab.Navigator initialRouteName = "Home" screenOptions = {NavBarBottomStyle}> 

        <Tab.Screen name = "Home" component = {HomeScreen} 
          options = {({ route }) => ( {...NavBarBottomStyle,     headerStyle: {
            backgroundColor: isDarkTheme ? '#535559' : '#1C74AA'},

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = 'home-outline' color = 'white' size = {30} />       
          ),
          
          headerLeft: () => (
            <TouchableOpacity style = {[{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}, NavBarBottomStyle]} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoAccountDetail}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Salas" component = {DetailsScreen} screenOptions = {NavBarBottomStyle} 
          options = {({ route }) => ( {...screenOptions,

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "door" color = {'white'} size = {30} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Tutores" component = {Tutores}
          options = {({ route }) => ( {...screenOptions,

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "school-outline" color = {'white'} size = {30} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Horarios" component = {Horarios}
          options = {({ route }) => ( {...screenOptions,

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "book-open-page-variant-outline" color = {'white'} size = {30} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Blog" component = {BlogScreen}
          options = {({ route }) => ( {...screenOptions,

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "account-group" color = {'white'} size = {30} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Recursos" component = {RecursosScreen}
          options = {({ route }) => ( {...screenOptions,

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "bookshelf" color = {'white'} size = {30} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "ChatBot" component = {Chatbot}
          options = {({ route }) => ( {...screenOptions,

          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "robot-outline" color = {'white'} size = {30} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

        <Tab.Screen name = "Talleres" component = {Workshop}
          options = {({ route }) => ( {...screenOptions,
            
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name = "robot-outline" color = {'white'} size = {30} />       
          ),

          headerLeft: () => (
            <TouchableOpacity style = {{marginLeft: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {handleGoToLogin}> 
              <MaterialCommunityIcons name = 'account-arrow-left' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>Cerrar Sesión</Text>
            </TouchableOpacity> 
          ),

          headerRight: () => (
            <TouchableOpacity style = {{marginRight: 25, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}} onPress = {{}}> 
              <MaterialCommunityIcons name = 'account-circle' color = 'white' size = {30} style = {{}}/>  
              <Text style = {styles.label}>{username}</Text>
            </TouchableOpacity> 
          ),
        })}/>

      </Tab.Navigator>    

  );
};

const styles = StyleSheet.create({

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

const screenOptions = {
  headerTitleAlign: 'center',
  tabBarShowLabel: false,
  
  headerStyle: {
    backgroundColor: 'red',
    height: 80,
  },

  headerTintColor: 'white',
  tabBarLabel: '',
};

export default Acceder;