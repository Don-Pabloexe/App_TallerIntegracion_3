import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => {
    setCount(prevCount => prevCount + 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Button 1" onPress={onPress} />
        <Button title="Button 2" onPress={onPress} />
        <Button title="Button 3" onPress={onPress} />
        <Button title="Button 4" onPress={onPress} />
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  countContainer: {
    marginTop: 20,
  },
  countText: {
    fontSize: 20,
  },
});
export default App;