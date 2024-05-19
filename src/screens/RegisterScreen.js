import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, SafeAreaView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "../components/firebaseConfig";
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const [loading, setLoading] = useState(false);

  const auth = FirebaseAuth;

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password, userName);
      console.log(response);
      alert('Please check your email.');
      navigation.navigate('TabAccount');
    } catch (error) {
      let msg = error.message;
      if(msg.includes('(auth/invalid-email)')) {
        msg = 'Invalid Email'
      }
      if(msg.includes('(auth/email-already-in-use)')) {
        msg = 'This email has already been registered, please choose another one.'
      }
      if(msg.includes('Password should be at least')) {
        msg = 'Password should be at least 6 characters.'
      }
      Alert.alert('Sign Up Error: ', msg);
      // Alert.alert('Sign Up: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../assets/tabicon/back.png')}/>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.loginContainer} >
        <Image source={require('../../assets/tabicon/signUp.png')} style={styles.image}></Image>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
            style={styles.input}
            placeholder="User Name"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
        />
        <View  style={styles.registerButtonContainer}>
          <TouchableOpacity style={styles.registerButtonStyle} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.signInContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}><Text style={styles.signInText}>Sign In</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      padding: 10
    },
    loginContainer: {
      flexGrow: 1,
      marginTop: -20,
      justifyContent: 'center',
      alignItems: 'center',
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
    image: {
      marginTop: -200,
      marginBottom: -50,
      height: 300,
      width: 300, 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#5683b0',
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    registerButtonContainer: {
      marginVertical: 10,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    registerButtonStyle: {
      borderColor: '#5683b0',
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginHorizontal: 20,
      marginBottom: 10
    },
    registerButtonText: {
      color: '#5683b0',
      fontSize: 15
    },
    signInContainer: {
      flexDirection: 'row'
    },
    signInText: {
      fontWeight: 'bold',
      color: '#5683b0'
    }
});

export default RegisterScreen;
