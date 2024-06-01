import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, RefreshControl, ScrollView, SafeAreaView, Share, TouchableOpacity } from 'react-native';


const NotificationDetailScreen = ({ route, navigation }) => {
  const { title, content, imageUrl, organizer } = route.params;
  const [isLoading, setIsLoading] = React.useState(true); 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  []);

  useEffect(() => {
    // to check if the data is successfully retrieved
    if (title && content && imageUrl && organizer) {
       setIsLoading(false);
    }
  }, [title, content, imageUrl, organizer]); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../../assets/tabicon/back.png')}/>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image style={styles.loadingIcon} source={require('../../../assets/tabicon/loading.gif')}  />
          <Text>Loading...</Text>
        </View>
      ):(
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>                 
            <Text style={styles.title}>{title}</Text>     
            <View style={styles.organizerContainer}>
                <Image style={styles.organizerIcon} source={{ uri: `https:${ imageUrl }` }} />
                <Text style={styles.organizerText}>{organizer}</Text>
            </View>  
            <View style={styles.textContainer}>
              <Text style={styles.description}>{content}</Text>    
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
    color: '#5683b0',
    textAlign: 'center'
  },
  organizerContainer: {
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
    marginLeft: 10,
    marginRight: 15
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#333',
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

export default NotificationDetailScreen;
