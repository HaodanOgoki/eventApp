import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TabLiveDetail = ({ route, navigation }) => {
  const { title, description, content } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.content}>{content}</Text>
      <Button title="Back to Main Screen" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default TabLiveDetail;
