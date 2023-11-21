import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('Usuario Anónimo');

  useEffect(() => {
    const fetchEmail = async () => {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if(storedEmail) {
            const usernamePart = storedEmail.split('@')[0]; // Toma solo la parte antes del '@'
            setUsername(usernamePart);
        }
    };

    fetchEmail();

    const unsubscribe = onSnapshot(
      query(collection(db, 'messages'), orderBy('timestamp', 'asc')),
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(fetchedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        await addDoc(collection(db, 'messages'), {
          text: newMessage,
          username,  // Nombre de usuario (parte del email antes del '@')
          timestamp: new Date(),
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Chat Colaborativo</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.username}: {item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje"
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;