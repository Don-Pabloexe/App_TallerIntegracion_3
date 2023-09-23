import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('Usuario Anónimo');

  useEffect(() => {
    // Carga los mensajes almacenados en AsyncStorage cuando el componente se monta
    loadMessages();
  }, []);

  // Función para cargar mensajes almacenados en AsyncStorage
  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('chatMessages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  // Función para guardar mensajes en AsyncStorage y actualizar el estado
  const saveMessages = async (messagesToSave) => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(messagesToSave));
      setMessages(messagesToSave);
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messages, { text: newMessage, username }];
      saveMessages(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Chat Colaborativo</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              username === item.username ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    color: 'white',
  },
  otherMessage: {
    alignSelf: 'flex-start',
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