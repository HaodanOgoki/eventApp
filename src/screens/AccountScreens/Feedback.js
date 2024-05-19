import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import email from 'react-native-email';

const Feedback = ({ navigation }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const sendFeedback = () => {
    if (feedbackText.trim() === '') {
      Alert.alert('Error', 'Please enter your feedback.');
      return;
    }

    
        const to = ['haodan@ogokilearning.com','jinghaodan@gmail.com'] // string or array of email addresses
        email(to, {
            subject: 'Feedback from Event App User',
            body: feedbackText,
        }).catch(error => {
            if (error) {
                Alert.alert('Error', 'Failed to send feedback. Please try again later.');
                console.log(error);
              } else {
                Alert.alert('Success', 'Your feedback has been sent. Thank you!');
                setFeedbackText('');
              }
        });
    

    // Mailer.mail({
    //   subject: 'Feedback from Event App User',
    //   recipients: ['haodan@ogokilearning.com'],
    //   body: feedbackText,
    //   isHTML: false,
    // }, (error, event) => {
    //   if (error) {
    //     Alert.alert('Error', 'Failed to send feedback. Please try again later.');
    //   } else {
    //     Alert.alert('Success', 'Your feedback has been sent. Thank you!');
    //     setFeedbackText('');
    //   }
    // });
  };

  return (
    <SafeAreaView >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../../assets/tabicon/back.png')} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View contentContainerStyle={styles.container}>   
        <Image source={require('../../../assets/tabicon/feedbackIllustration.png')} style={styles.image}></Image>
        <View style={styles.contentContainer}>
            {/* <Text style={styles.title}>Feedback</Text> */}
            <Text style={styles.subtitle}>We'd Love to Hear from You!</Text>
            <Text style={styles.content}>Your feedback helps us improve our app and provide a better experience for you. Please share your thoughts, suggestions, or report any issues you encounter.</Text>
        </View>
        <View style={styles.inputBox}>
            <TextInput
                style={styles.input}
                placeholder="Please enter your feedback here"
                multiline
                value={feedbackText}
                onChangeText={text => setFeedbackText(text)}
            />
        </View>
        <View style={styles.feedbackButtonContainer} >
            <TouchableOpacity style={styles.feedbackButtonStyle} onPress={sendFeedback}>
                <Text style={styles.feedbackButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
        </View>        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 200, 
  },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginTop: 15,
//     color: '#5683b0',
//     alignSelf: 'center'
//   },
  subtitle: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#5683b0',
    marginVertical: 15
  },
  content: {
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
  },
  contentContainer: {
    marginHorizontal: 15,
    paddingHorizontal: 10
  },
  inputBox: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 40,
    width: '90%',
    minHeight: 100,
    alignSelf: 'center'
  },
  input: {
    color: 'gray'  
  },
  feedbackButtonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: 200,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  feedbackButtonStyle: {
    borderColor: '#5683b0',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 20
  },
  feedbackButtonText: {
    color: '#5683b0',
    fontSize: 15
  },
  backButton: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
});

export default Feedback;
