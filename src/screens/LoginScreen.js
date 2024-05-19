import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, SafeAreaView, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
// import SignUpForm from "../SignUpForm";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { FirebaseAuth, FirebaseSetup } from "../components/firebaseConfig";
import RegisterScreen from './RegisterScreen';
// import { Octicons } from '@expo/vector-icons';

// import auth from '@react-native-firebase/auth';
// https://www.youtube.com/watch?v=osjP7T7Wz9k
// const handleSignUp = (email, password) => {
//   const auth = getAuth(app);
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log("SIGNUP USER", user)
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log("ERROR", error)
//     })

// };

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const auth = FirebaseAuth; 

  // useEffect(() => {
  //   const auth = firebase.auth(); 
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return unsubscribe; 
  // }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password); 
      console.log(response);
      navigation.navigate('TabAccount');
    } catch (error) {
      let msg = error.message;
      if(msg.includes('(auth/invalid-email)')) {
        msg = 'Invalid Email'
      }
      if(msg.includes('(auth/invalid-credential)')) {
        msg = 'Invalid Email or Wrong Password'
      }
      if(msg.includes('(auth/missing-password')) {
        msg = 'Please fill in the password.'
      }
      Alert.alert('Sign In Error: ', msg);
      // Alert.alert('Sign In Error: ', error.message);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
  
  // const handleRegister = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await createUserWithEmailAndPassword(auth, email, password); 
  //     console.log(response);
  //     alert('Please check your email.')
  //     // navigation.navigate('TabAccount');
  //   } catch (error) {
  //     Alert.alert('Error: ', error.message);
  //   } finally {
  //     setLoading(false);
  //   }


  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../assets/tabicon/back.png')}/>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginContainer} >
        <Image source={require('../../assets/tabicon/signIn.png')} style={styles.image}></Image>
        <Text style={styles.title}>User Login</Text>
        {/* <KeyboardAvoidingView behavior='padding'> */}
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
          <Text style={styles.forgetPassword}>Forget Password</Text>
          <View style={styles.loginButtonContainer} >
              <TouchableOpacity style={styles.loginButtonStyle} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.loginButtonStyle} onPress={handleRegister}>
                  <Text style={styles.loginButtonText}>Register</Text>
              </TouchableOpacity> */}
          </View>
          <View style={styles.registerContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}><Text style={styles.signUpText}>Sign Up</Text></TouchableOpacity>
          </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </SafeAreaView>
    // <View>
    //   <SignUpForm onSignUp={handleSignUp} />
    // </View>
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
    color: '#5683b0'
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
  forgetPassword: {
    fontSize: 13,
    color: 'gray',
    alignSelf: 'flex-end',
    marginRight: 40
  },
  loginButtonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: 200,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonStyle: {
    borderColor: '#5683b0',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 20
  },
  loginButtonText: {
    color: '#5683b0',
    fontSize: 15
  },
  registerContainer: {
    flexDirection: 'row'
  },
  signUpText: {
    fontWeight: 'bold',
    color: '#5683b0'
  }
});

export default LoginScreen;
