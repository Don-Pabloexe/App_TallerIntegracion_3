import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setUsername(storedEmail.split('@')[0]);
      }
    };

    fetchEmail();

    const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(fetchedMessages);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        await addDoc(collection(db, 'messages'), {
          text: newMessage,
          username: username || 'Anónimo',
          timestamp: new Date(),
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderItem = ({ item }) => {
    const isCurrentUserMessage = item.username === username;
    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUserMessage ? styles.currentUserMessage : styles.otherUserMessage,
        ]}>
        <Text style={styles.messageText}>{item.username}: {item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Chat Colaborativo</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
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
  currentUserMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
    backgroundColor: '#e3e3e3',
    alignSelf: 'flex-start',
  },
});

export default ChatScreen;
