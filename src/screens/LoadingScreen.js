// Import necessary libraries
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// Define the LoadingScreen component
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Export the component
export default LoadingScreen;
