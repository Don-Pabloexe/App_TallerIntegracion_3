import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const Home = () => {
  const { isDarkTheme } = useTheme();

  const containerStyle = {
    backgroundColor: isDarkTheme ? '#737780' : 'white',
  };

  const textStyle = {
    color: isDarkTheme ? 'white' : 'black',
  };

  return (
    <View style = {[styles.container, containerStyle]}>
      <Text style = {[styles.text, textStyle]}>a</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  text: {
    fontSize: 18,
  },
});

export default Home;
