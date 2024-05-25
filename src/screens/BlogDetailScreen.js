import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, RefreshControl, ScrollView, SafeAreaView, Share, TouchableOpacity } from 'react-native';

const PostDetailScreen = ({ route, navigation }) => {
  const { title, description, introduction, imageUrl} = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true); 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  []);

  // Share function to share the page
  const eventShare = async() => {
    const shareOptions = {
      message: "Please join me with this fantastic event! Event Detail: www.google.com"
    }

    try{
      const ShareResponse = await Share.share(shareOptions);
    } catch (error) {
      console.log('Error =>' , error);
    }
  };

  useEffect(() => {
    // to check if the data is successfully retrieved
    if (title && description && imageUrl) {
       setIsLoading(false);
    }
  }, [title, description, imageUrl]); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../assets/tabicon/back.png')}/>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image style={styles.loadingIcon} source={require('../../assets/tabicon/loading.gif')}  />
          <Text>Loading...</Text>
        </View>
      ):(
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Image style={styles.featuredImage} source={{ uri: `https:${ imageUrl }` }} />

          <TouchableOpacity style={styles.shareContainer} onPress={eventShare}>
            <Image style={styles.shareIcon} source={require('../../assets/tabicon/share.png')} />
          </TouchableOpacity>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>       
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.introductionContainer}>
            {/* <Text>{introduction}</Text> */}
          </View>
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
    
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingIcon: {
    height: 50,
    width: 50
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
    textAlign: 'center'
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
  shareContainer: {
    position: 'absolute',
    right: 20,
    top: 50,
    borderColor: 'rgba(255, 255, 255, 0.8)', 
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  shareIcon: {
    height: 25,
    width: 25
  },
});

export default PostDetailScreen;
