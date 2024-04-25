import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  view: {
    height: 60,
    backgroundColor: "#272727",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "#FFFFFF",
    fontSize: 18,
    textTransform: "capitalize",
  },
});

export default function Button({ title, containerStyle, onPress }) {
  return (
    <TouchableOpacity style={[styles.view, containerStyle]} onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}
