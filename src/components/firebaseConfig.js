// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP50ZIa8D3x9c_I_d_Le-8TlVK5xlZIvY",
  authDomain: "ogoki-event-app-e71ee.firebaseapp.com",
  projectId: "ogoki-event-app-e71ee",
  storageBucket: "ogoki-event-app-e71ee.appspot.com",
  messagingSenderId: "784976730709",
  appId: "1:784976730709:web:fa341a68e1e6f9a41c52dc",
  measurementId: "G-JJTY4FSQZB"
};


// const asnalytics = getAnalytics(app);

export const FirebaseSetup = initializeApp(firebaseConfig);
export const FirebaseAuth = initializeAuth(FirebaseSetup, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const FirestoreDB = getFirestore(FirebaseSetup);