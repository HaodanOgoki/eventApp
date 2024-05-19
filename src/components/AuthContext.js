import React, { createContext, useContext, useState, useEffect } from "react";
import { FirebaseAuth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../screens/LoadingScreen";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        await AsyncStorage.setItem("userToken", authUser.uid);
        setUser(authUser);
      } else {
        await AsyncStorage.removeItem("userToken");
        setUser(null);
      }
      setLoading(false);
    });

    const checkUserToken = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        const currentUser = auth.currentUser;
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkUserToken();

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show a loading screen while checking auth state
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
