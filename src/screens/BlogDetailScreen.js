import React from 'react';
import { View, Text, Image, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const PostDetailScreen = ({ route, navigation }) => {
  const { title, description, introduction, imageUrl, } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Image style={styles.featuredImage} source={{ uri: `https:${ imageUrl }` }} />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>       
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.introductionContainer}>
            <Text>{introduction}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10
  },
  scrollView: {
    flexGrow: 1,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center'
  },
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  organizerText: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color:'#333'
  },
  organizerIcon: {
    height: 30,
    width: 30,
    borderRadius:15,
    marginLeft: 5,
    marginRight: 15
  },
  category: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: -30,
    color: '#5683b0',
    borderColor: '#5683b0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5
  },
  categoryContainer: {
    alignItems: 'flex-end',
    marginTop: -5
  },
  dateTimeContainer: {
    marginBottom: 15
  },
  dateTime: {
    fontSize: 12,
    color: '#333',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  mapContainer: {
    borderColor: '#5683b0',
    borderWidth: 1,
    height: 150,
    width: '100%',
    marginTop: 10,
    overflow: 'hidden'
  },
  mapView: {
    flex: 1,
  },
  featuredImage: {
    marginTop: 30,
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#5683b0',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  backButtonText: {
    fontSize: 16,
    color: '#5683b0',
  },
});

export default PostDetailScreen;
