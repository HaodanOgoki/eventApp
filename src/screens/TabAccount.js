import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import 'firebase/auth';
import LoginScreen from '../screens/LoginScreen'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { FirebaseAuth } from '../components/firebaseConfig';

const TabAccount = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // State variable for modal visibility
    const [emailInput, setEmailInput] = useState('');
  
    let unsubscribe;
    // const {user, setUser} = useState<User | null>(null);

    useEffect(() => {
      const auth = FirebaseAuth; 
      unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
          console.log('user', user);
          setUser(user);
      });

      return () => {
          if (unsubscribe) {
              unsubscribe();
          }
      };
  }, []);
  
    const handleLogout = async () => {
      try {
        await FirebaseAuth.signOut(); 
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    const handleInvite = () => {
      // Handle sending invite here
      // For example, you can send an email using a backend API
      console.log('Invite sent to:', emailInput);
      Alert.alert('Invite Sent', `An invite has been sent to ${emailInput}`);
      setEmailInput('');
      setModalVisible(false);
    };
  
    if (!user) {
      return <LoginScreen navigation={navigation} />;
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          {/* Display user information here */}
          {/* <Image source={{ uri: user.photoURL }} style={styles.avatar} /> */}
          {/* <Text style={styles.username}>{user.displayName || 'No Name'}</Text>
          <Text style={styles.email}>{user.email}</Text> */}
            <Image source={require('../../assets/blog_pics/ElonMusk.png')} style={styles.userImage}></Image>
            <View style={styles.userInfo}> 
              <Text style={styles.userName}>User Name</Text>   
              <Text style={styles.userEmail}>useremail@email.com</Text>
            </View>      
        </View>
        <TouchableOpacity style={styles.sectionContainer}>
          <Image source={require('../../assets/tabicon/ticket.png')} style={styles.sectionImage}></Image>
          <Text style={styles.sectionTitle}>My Tickets</Text>
            {/* Display user tickets here */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer}>
          <Image source={require('../../assets/tabicon/heart.png')} style={styles.sectionImage}></Image>
          <Text style={styles.sectionTitle}>My Favorites</Text>
            {/* Display user favorites here */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} onPress={() => navigation.navigate("Notification")} >
          <Image source={require('../../assets/tabicon/notifications.png')} style={styles.sectionImage}></Image>
          <Text style={styles.sectionTitle}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} onPress={() => setModalVisible(true)}>
          <Image source={require('../../assets/tabicon/invite.png')} style={styles.sectionImage}></Image>
          <Text style={styles.sectionTitle}>Invite Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} onPress={() => navigation.navigate("ChatRoom")}>
          <Image source={require('../../assets/tabicon/chatroom.png')} style={styles.sectionImage}></Image>
          <Text style={styles.sectionTitle}>ChatRoom</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} onPress={() => navigation.navigate("Feedback")} >
          <Image source={require('../../assets/tabicon/feedback.png')} style={styles.sectionImage}></Image>
          <Text style={styles.sectionTitle}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} onPress={() => navigation.navigate("PrivacyTerm")}>
          <Image source={require('../../assets/tabicon/privacy.png')} style={styles.sectionImage}></Image>
          <Text style={styles.sectionTitle}>Privacy & Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} onPress={handleLogout}>
          <Image source={require('../../assets/tabicon/logout.png')} style={styles.sectionImage}></Image>
          <Text style={styles.sectionTitle}>Logout</Text>
        </TouchableOpacity>

        {/* Pop-up modal to invite friends */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Friend's Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={emailInput}
                onChangeText={setEmailInput}
                keyboardType="email-address"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.inviteButton} onPress={handleInvite}>
                  <Text style={styles.inviteButtonText}>Send Invite</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    userInfoContainer: {
      alignItems: 'center',
      marginBottom: 40,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    userInfo: {
      flex: 1,
      justifyContent: 'center'
    },
    // imageBox: {
    //   top: 10,
    //   left: 0,
    //   right: 0,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   marginBottom: 20
    // },
    userImage: {
      marginLeft: 20,
      marginRight: 20,
      height: 100,
      width: 100,
      borderRadius: 60
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      marginRight:20,
      color: '#5683b0'
    },
    userEmail: {
      color: '#777',
    },
    inviteButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderColor: '#5683b0',
      borderWidth: 1
    },
    cancelButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderColor: '#5683b0',
      borderWidth: 1
    },
    inviteButtonText: {
      color: '#5683b0',
      fontSize: 16,
    },
    cancelButtonText: {
      color: '#5683b0',
      fontSize: 16,
    },
    sectionContainer: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 5,
      borderRadius: 8,
      width: '90%',
      alignItems: 'left',
    },
    sectionImage: {
      width: 20,
      height: 20
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: 300,
      marginBottom: 5,
      marginLeft: 10,
      color: '#5683b0'
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
      color: '#5683b0',
      fontWeight: 'bold'
    },
    input: {
      width: 200,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      width: '90%',
      marginTop: 10, 
      paddingHorizontal: 35
    },
    inviteButton: {
      paddingVertical: 8, 
      paddingHorizontal: 15, 
      borderRadius: 10,
      backgroundColor: '#5683b0', 
    },
    cancelButton: {
      paddingVertical: 8, 
      paddingHorizontal: 15, 
      borderRadius: 10,
      backgroundColor: '#fff', 
      borderWidth: 1, 
      borderColor: '#5683b0', 
    },
    inviteButtonText: {
      color: '#fff', 
      fontSize: 15,
      fontWeight: 'bold', 
    },
    cancelButtonText: {
      color: '#5683b0', 
      fontSize: 15,
      fontWeight: 'bold', 
    },
  });
  
  export default TabAccount;