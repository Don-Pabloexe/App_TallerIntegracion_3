import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const AccountDetailsScreen = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style = {[styles.container, isDarkTheme ? { backgroundColor: '#737780' } : { backgroundColor: 'white' }]}>
      <Text style = {[styles.title, isDarkTheme ? { color: 'white' } : { color: 'black' }]}>Recursos Académicos</Text>
      
      <Switch
        value = {isDarkTheme}
        onValueChange = {toggleTheme}
        ios_backgroundColor = "#3e3e3e"
        trackColor = {{ false: '#767577', true: '#81b0ff' }}
        thumbColor = {isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {},
});

export default AccountDetailsScreen;


