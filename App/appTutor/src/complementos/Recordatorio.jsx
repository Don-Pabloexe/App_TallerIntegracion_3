import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Recordatorio = () => {
  const [date, setDate] = useState(new Date());

  const scheduleNotification = async () => {
    const now = new Date();
    const timestamp = now.getTime() + 5000; // Notificación después de 5 segundos

    const schedulingOptions = {
      content: {
        title: '¡Es hora de tu recordatorio!',
        body: 'Como estan muchachos.',
      },
      trigger: {
        seconds: 5,
        repeats: false,
      },
    };

    await Notifications.scheduleNotificationAsync(schedulingOptions);

    Alert.alert('¡Notificación programada!', `El recordatorio está programado para: ${new Date(timestamp).toString()}`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ margin: 10 }}>
        <Button onPress={scheduleNotification} title="Programar recordatorio" />
      </View>
    </View>
  );
};

export default Recordatorio;
