import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/complementos/ThemeContext';
import Acceder from './src/complementos/navigation';
import HomeScreen from './src/complementos/Home';
import DetailsScreen from './src/complementos/Salas';
import Tutores from './src/complementos/Tutores';
import Horarios from './src/complementos/Horarios';
import RecursosScreen from './src/complementos/recursos';
import BlogScreen from './src/complementos/Blog';
import Chatbot from './src/complementos/chatbot';
import Workshop from './src/complementos/Nuevo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName = "Acceder">
          
          <Stack.Screen name = "Acceder" component = {Acceder} 
            options = {{headerShown: false}}/>

          <Stack.Screen name = "Home" component = {HomeScreen}/>
          <Stack.Screen name = "AccountDetails" component = {DetailsScreen}/>
          <Stack.Screen name = "Tutores" component = {Tutores}/>
          <Stack.Screen name = "Horarios" component = {Horarios}/>
          <Stack.Screen name = "Recursos" component = {RecursosScreen}/>
          <Stack.Screen name = "Blog" component = {BlogScreen}/>
          <Stack.Screen name = "Chat" component = {Chatbot}/>
          <Stack.Screen name = "Talleres" component = {Workshop}/>
        
        </Stack.Navigator>
        
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
