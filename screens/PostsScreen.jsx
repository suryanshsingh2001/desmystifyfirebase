import {View, Text, Button, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../Firebase/firestore';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const PostsScreen = ({navigation}) => {

    // State to store all posts
  const [posts, setPosts] = React.useState([]);


  // Fetch all posts from Firestore
  const getAllPosts = async () => {
    try {
      const fetchedPosts = await getAllDocuments('posts');
      console.log(fetchedPosts);

      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }

  };

  // Add a new post to Firestore
  const addPost = async () => {

    try {
      await createDocument('posts', {
        title: 'New Post',
        content: 'This is a new post',
      });
      getAllPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

    // Delete a post from Firestore
  const deletePost = async postId => {
    try {
      await deleteDocument('posts', postId);
      getAllPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

    // Update a post in Firestore
  const updatePost = async postId => {
    console.log('Updating post:', postId);
    try {
      await updateDocument('posts', postId, {
        title: 'Updated Post',
        content: 'This post has been updated',
      });
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            id: postId,
            title: 'Updated Post',
            content: 'This post has been updated',
          };
        }
        return post;
      });
      getAllPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };


  // Fetch all posts from Firestore when the component mounts
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Button title="Add Post" onPress={addPost} />
      <Text
        style={{
          color: 'black',
          margin: 10,
          padding: 10,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Posts
      </Text>

      <FlatList
        data={posts}
        ListEmptyComponent={() => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 18}}>No Posts Found</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View
            style={{
              margin: 10,
              padding: 10,
              borderColor: 'black',
              borderWidth: 1,
              flexDirection: 'column',
            }}>
            <Text style={{color: "black", fontSize: 16, marginBottom:5}}>{item.title}</Text>
            <Text style={{color: "gray", fontSize: 12, marginBottom:10}}>{item.content}</Text>

            <Button
              title="Edit Post"
              onPress={() => updatePost(item.id)}
              color={'purple'}
            />

            <Button
              title="Delete Post"
              onPress={() => deletePost(item.id)}
              color={'red'}
            />
          </View>
        )}
        keyExtractor={(item, index) => (item.id || index).toString()}
      />
    </View>
  );
};

export default PostsScreen;
