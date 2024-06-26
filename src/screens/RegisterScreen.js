import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "../components/firebaseConfig";
import { collection, ref, getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, onValue, push } from "@firebase/database";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import { storage } from "../components/firebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";

// This register screen works in creating an account in firebase authentication. saving the username, email, password, and image.
// ONLY AS LONG AS YOU PRESS BACK BUTTON UPON PRESSING THE "SIGN UP" AND SEEING A FOREVER LOADING INDICATOR.

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const auth = FirebaseAuth;
  const db = getFirestore();

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      // Update profile with username
      if (userName) {
        await updateProfile(user, { displayName: userName });
      }

      if (image) {
        await uploadImage(image, user);
      }

      alert("Please check your email.");
      navigation.navigate("TabAccount");
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid Email";
      }
      if (msg.includes("(auth/email-already-in-use)")) {
        msg =
          "This email has already been registered, please choose another one.";
      }
      if (msg.includes("Password should be at least")) {
        msg = "Password should be at least 6 characters.";
      }
      if (msg.includes("Property 'image' doesn't exist")) {
        msg = "Please upload an image.";
      }
      Alert.alert("Sign Up Error: ", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to choose an image.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("There was an error picking the image. Please try again.");
    }
  };

  const uploadImage = async (uri, user) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = storageRef(
        storage,
        `images/${user.uid}/${Date.now()}.jpg`
      );

      await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(imageRef);
      console.log("Image URL:", url);

      // Save the image URL to Firestore or Realtime Database
      await setDoc(
        doc(db, "users", user.uid),
        { imageUrl: url },
        { merge: true }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("There was an error uploading the image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={require("../../assets/tabicon/back.png")}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image
            style={styles.loadingIcon}
            source={require("../../assets/tabicon/loading.gif")}
          />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <Image
            source={require("../../assets/tabicon/signUp.png")}
            style={styles.image}
          />
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
          <TouchableOpacity
            style={styles.uploadImageContainer}
            onPress={pickImage}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.userImage} />
            ) : (
              <>
                <Image
                  style={styles.imageIcon}
                  source={require("../../assets/tabicon/image.png")}
                />
                <Text style={styles.uploadImageText}>Upload Image</Text>
              </>
            )}
          </TouchableOpacity>
          <View style={styles.registerButtonContainer}>
            <TouchableOpacity
              style={styles.registerButtonStyle}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.signInContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  loginContainer: {
    flexGrow: 1,
    marginTop: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  backButton: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "30%",
  },
  backIcon: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
  },
  image: {
    marginTop: -200,
    marginBottom: -50,
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5683b0",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  uploadImageContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  imageIcon: {
    height: 50,
    width: 50,
  },
  uploadImageText: {
    color: "#ccc",
  },
  userImage: {
    height: 100,
    width: 100,
  },
  registerButtonContainer: {
    marginVertical: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonStyle: {
    borderColor: "#5683b0",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  registerButtonText: {
    color: "#5683b0",
    fontSize: 15,
  },
  signInContainer: {
    flexDirection: "row",
  },
  signInText: {
    fontWeight: "bold",
    color: "#5683b0",
  },
});

export default RegisterScreen;
