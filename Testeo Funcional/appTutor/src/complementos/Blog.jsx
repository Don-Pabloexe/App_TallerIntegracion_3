import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlogScreen = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [comments, setComments] = useState({});
  const [votes, setVotes] = useState({});
  const [commentText, setCommentText] = useState('');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  useEffect(() => {
    loadBlogData();
  }, []);

  const loadBlogData = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('blogPosts');
      const storedComments = await AsyncStorage.getItem('blogComments');
      const storedVotes = await AsyncStorage.getItem('blogVotes');
      const storedLikes = await AsyncStorage.getItem('blogLikes');
      const storedDislikes = await AsyncStorage.getItem('blogDislikes');

      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }

      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }

      if (storedVotes) {
        setVotes(JSON.parse(storedVotes));
      }

      if (storedLikes) {
        setLikes(JSON.parse(storedLikes));
      }

      if (storedDislikes) {
        setDislikes(JSON.parse(storedDislikes));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleAddPost = async () => {
    if (newPost.trim() !== '') {
      const postId = Date.now().toString();
      const newPosts = [...posts, { id: postId, text: newPost }];
      setPosts(newPosts);
      setNewPost('');

      try {
        await AsyncStorage.setItem('blogPosts', JSON.stringify(newPosts));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  const handleAddComment = async (postId) => {
    if (commentText.trim() !== '') {
      const newComment = commentText;

      if (!comments[postId]) {
        comments[postId] = [];
      }

      comments[postId].push(newComment);

      setComments({ ...comments });
      setCommentText('');

      try {
        await AsyncStorage.setItem('blogComments', JSON.stringify(comments));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  const handleVote = async (postId, voteType) => {
    const userVoted = votes[postId];

    if (!userVoted) {
      votes[postId] = voteType;

      if (voteType === 'like') {
        if (!likes[postId]) {
          likes[postId] = 0;
        }
        likes[postId]++;
      } else {
        if (!dislikes[postId]) {
          dislikes[postId] = 0;
        }
        dislikes[postId]++;
      }

      setVotes({ ...votes });
      setLikes({ ...likes });
      setDislikes({ ...dislikes });

      try {
        await AsyncStorage.setItem('blogVotes', JSON.stringify(votes));
        await AsyncStorage.setItem('blogLikes', JSON.stringify(likes));
        await AsyncStorage.setItem('blogDislikes', JSON.stringify(dislikes));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog Educativo</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu artículo"
        value={newPost}
        onChangeText={(text) => setNewPost(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postText}>{item.text}</Text>
            <TouchableOpacity
              style={[
                styles.voteButton,
                votes[item.id] && styles.disabledVoteButton,
              ]}
              onPress={() => handleVote(item.id, 'like')}
              disabled={votes[item.id]}
            >
              <Text style={styles.voteButtonText}>Like</Text>
              <Text style={styles.voteCount}>{likes[item.id] || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.voteButton,
                votes[item.id] && styles.disabledVoteButton,
              ]}
              onPress={() => handleVote(item.id, 'dislike')}
              disabled={votes[item.id]}
            >
              <Text style={styles.voteButtonText}>Dislike</Text>
              <Text style={styles.voteCount}>{dislikes[item.id] || 0}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.commentInput}
              placeholder="Añade un comentario"
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
            />
            <TouchableOpacity
              style={styles.commentButton}
              onPress={() => handleAddComment(item.id)}
            >
              <Text style={styles.commentButtonText}>Comentar</Text>
            </TouchableOpacity>
            <FlatList
              data={comments[item.id] || []}
              keyExtractor={(comment) => comment}
              renderItem={({ item: comment }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.commentText}>{comment}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  postText: {
    fontSize: 16,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  disabledVoteButton: {
    backgroundColor: '#CCC',
  },
  voteButtonText: {
    color: 'green',
    marginRight: 8,
  },
  voteCount: {
    fontWeight: 'bold',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  commentButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  commentText: {
    fontSize: 14,
  },
});

export default BlogScreen;