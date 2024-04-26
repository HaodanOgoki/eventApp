import React from 'react';
import { View, Text, Image, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const PostDetailScreen = ({ route, navigation }) => {
  const { title, location, favorite, description, organizer, dateTime, map, imageUrl, imageUrl2 } = route.params;
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../assets/tabicon/back.png')}/>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Image style={styles.featuredImage} source={{ uri: `https:${ imageUrl }` }} />
          <View style={styles.organizer}>
            <Image style={styles.organizerIcon} source={{ uri: `https:${ imageUrl2}`}} />
            <Text style={styles.organizerText}>{organizer}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>           
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
    marginTop: -20
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  organizerText: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  organizerIcon: {
    height: 30,
    width: 30,
    borderRadius:15,
    marginLeft: 15,
    marginRight: 15
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#333',
  },
  featuredImage: {
    marginTop: 30,
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
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
});

export default PostDetailScreen;
