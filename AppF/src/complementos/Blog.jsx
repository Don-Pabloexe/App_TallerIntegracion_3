import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { addDoc, collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('Usuario Anónimo');

  const fetchCommentsForArticle = async (articleId) => {
    const unsubscribeComments = onSnapshot(
      query(collection(doc(db, 'articles', articleId), 'comments'), orderBy('timestamp', 'asc')),
      (snapshot) => {
        const fetchedComments = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setComments((prevComments) => ({
          ...prevComments,
          [articleId]: fetchedComments,
        }));
      }
    );

    return unsubscribeComments;
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        const usernamePart = storedEmail.split('@')[0];
        setUsername(usernamePart);
      }
    };

    fetchUsername();

    const unsubscribe = onSnapshot(
      query(collection(db, 'articles'), orderBy('timestamp', 'asc')),
      async (snapshot) => {
        const fetchedArticles = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setArticles(fetchedArticles);

        // Load comments for all articles
        for (let article of fetchedArticles) {
          await fetchCommentsForArticle(article.id);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedArticleId) {
      return fetchCommentsForArticle(selectedArticleId);
    }
  }, [selectedArticleId]);

  const handleLike = async (article) => {
    const articleRef = doc(db, 'articles', article.id);

    if (article.likedBy && article.likedBy.includes(username)) {
      article.likes -= 1;
      const index = article.likedBy.indexOf(username);
      article.likedBy.splice(index, 1);
    } else {
      article.likes = (article.likes || 0) + 1;
      if (!article.likedBy) {
        article.likedBy = [];
      }
      article.likedBy.push(username);
    }

    await updateDoc(articleRef, {
      likes: article.likes,
      likedBy: article.likedBy,
    });
  };

  const sendArticle = async () => {
    if (newArticle.trim() !== '') {
      try {
        await addDoc(collection(db, 'articles'), {
          text: newArticle,
          username,
          timestamp: new Date(),
          likes: 0,
          likedBy: [],
        });
        setNewArticle('');
      } catch (error) {
        console.error('Error sending article:', error);
      }
    }
  };

  const sendComment = async () => {
    if (selectedArticleId && newComment.trim() !== '') {
      try {
        await addDoc(collection(doc(db, 'articles', selectedArticleId), 'comments'), {
          text: newComment,
          username,
          timestamp: new Date(),
        });
        setNewComment('');
      } catch (error) {
        console.error('Error sending comment:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Blog Educativo</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe un articulo"
        value={newArticle}
        onChangeText={setNewArticle}
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendArticle}>
        <Text style={styles.sendButtonText}>Enviar Articulo</Text>
      </TouchableOpacity>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <Text style={styles.articleText}>{item.username}: {item.text}</Text>
            <Text>{item.likes || 0} Me gusta</Text>
            <TouchableOpacity onPress={() => handleLike(item)}>
              <Text style={styles.likeButton}>👍 Me gusta</Text>
            </TouchableOpacity>
            <FlatList
              data={comments[item.id] || []}
              keyExtractor={(comment, index) => index.toString()}
              renderItem={({ item: comment }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.commentText}>
                    {comment.username}: {comment.text}
                  </Text>
                </View>
              )}
            />
            <TextInput
              style={styles.input}
              placeholder="Haz un comentario..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                setSelectedArticleId(item.id);
                sendComment();
              }}
            >
              <Text style={styles.sendButtonText}>Comentar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  likeButton: {
    color: '#007AFF',
    marginVertical: 8,
    
  },
  articleContainer: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  articleText: {
    fontSize: 16,
    color: '#333',
  },
  commentContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    marginLeft: 16,
  },
  commentText: {
    fontSize: 14,
  },
  
});

export default ChatScreen;
