// npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcVHH98nX7dFYiSPvxTbFX-b6syWJtRUE",
  authDomain: "ogoki-event-app.firebaseapp.com",
  projectId: "ogoki-event-app",
  storageBucket: "ogoki-event-app.appspot.com",
  messagingSenderId: "23032887454",
  appId: "1:23032887454:web:f31632a3549a713d83a38f",
  measurementId: "G-6XM5MK090N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);