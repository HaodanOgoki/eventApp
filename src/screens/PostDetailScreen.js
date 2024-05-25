import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity, Share, Modal } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import ShareSocial from 'react-share-social';
import { getDatabase, ref, push, onValue } from "@firebase/database";
import { FirebaseAuth } from '../components/firebaseConfig';

const PostDetailScreen = ({ route, navigation }) => {
  console.log(route.params);
  const { id, title, location, favorite, description, organizer, dateTime, map, imageUrl, imageUrl2 } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState(''); 
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  []);

  const eventShare = async() => {
    const shareOptions = {
      message: "Please join me with this fantastic event! Event Detail: www.google.com"
    }

    try{
      const ShareResponse = await Share.share(shareOptions);
    } catch (error) {
      console.log('Error =>' , error);
    }
  };

  const generateShareUrl = () => {
    const generatedUrl = `${title}\n\n${description}`;

    // const generatedUrl = `https://example.com/${title.replace(/\s/g, '-')}/details?id=123`;

    setShareUrl(generatedUrl);
  };

  

  const copyLink = () => {
    Clipboard.setString(shareUrl);
    alert('Link copied to clipboard!');
    setModalVisible(false);
  };

  const shareToFacebook = async () => {
    try {
      await ShareSocial.shareToFacebook({
        url: shareUrl,
        caption: title,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const shareToTwitter = async () => {
    try {
      await ShareSocial.shareToTwitter({
        url: shareUrl,
        title: title,
        message: content,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    // generateShareUrl();

    const db = getDatabase();
    const commentsRef = ref(db, "/comments");
    
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedComments = [];
      for(let key in data) {
        if(data[key].eventId === id) { // Check if the comment is related to this event only
          loadedComments.push({id: key, ...data[key]});
        }
      }
      setComments(loadedComments.reverse());
    });
    
    return () => unsubscribe();

  }, []);

  const handleComment = () => {
    const db = getDatabase();
    const commentsRef = ref(db, "comments/");
    const user = FirebaseAuth.currentUser;
    
    // Adding a new comment to Firebase.
    push(commentsRef, {
      eventId: id,
      text: userComment,
      timestamp: Date.now(),
      userId: user.uid,
      userName: user.displayName
    });
    
    setUserComment("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../assets/tabicon/back.png')}/>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Image style={styles.featuredImage} source={{ uri: `https:${ imageUrl }` }} />

          <TouchableOpacity style={styles.shareContainer} onPress={eventShare}>
            <Image style={styles.shareIcon} source={require('../../assets/tabicon/share.png')} />
          </TouchableOpacity>

          <View style={styles.organizer}>
            <Image style={styles.organizerIcon} source={{ uri: `https:${ imageUrl2}`}} />
            <Text style={styles.organizerText}>{organizer}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>           
          </View>

          {/* Comment input */}
          <View style={styles.inputContainer}>
            <View style={styles.commentInputContainer}>
              <TextInput
                  value={userComment}
                  onChangeText={setUserComment}
                  placeholder="Write a comment here"
              />          
            </View>
            <TouchableOpacity style={styles.sendCommentContainer} onPress={handleComment}>
                <Text style={styles.submitButtonText} >Submit Comment</Text>
            </TouchableOpacity>
          </View>

          {/* Show user comments */}
          <View>
            <Text style={styles.commentTitle}>Comments</Text>
            {comments.map((comment, index) => (
                <View style={styles.commentContainer} key={index}>
                  <Image style={styles.organizerIcon} source={{ uri: `https:${ imageUrl2}`}} />
                  {/* the imageurl need to be updated to the user profile picture */}
                  <View style={styles.userCommentInfoContainer}>    
                    <Text>User Name</Text>
                    {/* <Text>By: {comment.userName}</Text> */}
                    <Text style={styles.commentText}>{comment.text}</Text>                   
                    
                  </View>
                </View>
            ))}
          </View>

          {/* <Button title="Share" onPress={() => setModalVisible(true)} /> */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <Text>Share this event</Text>
              <Text>If you like this event, please share it with your friends.</Text>
              <Button title="Copy Link" onPress={copyLink} />
              <Button title="Share on Facebook" onPress={shareToFacebook} />
              <Button title="Share on Twitter" onPress={shareToTwitter} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
    
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10
  },
  scrollView: {
    flexGrow: 1,
    marginTop: -20
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  organizerText: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  organizerIcon: {
    height: 30,
    width: 30,
    borderRadius:15,
    marginLeft: 15,
    marginRight: 15
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#333',
  },
  featuredImage: {
    marginTop: 30,
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  shareContainer: {
    position: 'absolute',
    right: 20,
    top: 50,
    borderColor: 'rgba(255, 255, 255, 0.8)', 
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  shareIcon: {
    height: 25,
    width: 25
  },
  buttonContainer: {
    justifyContent: 'center'
  },
  backButton: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    // borderColor: '#5683b0',
    // borderWidth: 1,
    // borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  backIcon: {
    height: 15,
    width: 15,
    marginRight: 10
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    alignItems: 'center'
  },
  commentInputContainer: {
    height: 100,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  sendCommentContainer: {
    width: '50%',
    marginVertical: 10,
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 10,
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#5683b0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButtonText: {
    color: '#5683b0', 
    fontSize: 15,
    fontWeight: 'bold', 
  },
  commentTitle: {
    marginLeft: 10,
    marginTop: 20,
    color: '#5683b0', 
    fontSize: 20,
    fontWeight: 'bold', 
  },
  commentContainer: {
    width: '90%',
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: 'row',
    paddingRight: 10
  },
  commentText: {
    color: '#333',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 300,
    marginHorizontal: 40,
    borderRadius: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default PostDetailScreen;
