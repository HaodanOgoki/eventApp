import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createClient } from 'contentful';

const Stack = createNativeStackNavigator();

const Contentful = createClient({
    space: 'f0ke2at73bdn',
    accessToken: 'QOqCqOf3sJfUBUuePTBPtoJyBi9PkJ74ztKw63xFav4',
  });

const MainScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12; // 24h to 12h
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Adds leading zero if needed.
    const amPm = hours < 12 ? "AM" : "PM";
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Contentful.getEntries({ content_type: 'notification' });
        setData(response.items);
      } catch (error) {
        console.error('Error fetching data from Contentful:', error);
      }
    };

    fetchData();
  }, []);

  const Header = () => (
    // <ImageBackground source={require('../../assets/bkg_pics/banner_bkg.png')} style={styles.headerBackground}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
    // </ImageBackground>
  );

  const renderItem = ({ item }) => {
    const timestamp = item.sys.createdAt;
    return(
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
                navigation.navigate('NotificationScreen', {
                title: item.fields.title,
                content: item.fields.content,
                imageUrl: item.fields.organizerImage.fields.file.url, 
                organizer: item.fields.organizer,
                })
            }>
            <View style={styles.postContainer}>
                <View style={styles.imageBox}>
                <Image style={styles.organizerImage} source= {{uri: `https:${ item.fields.organizerImage.fields.file.url }`}}/>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.organizer}>{item.fields.organizer}</Text>
                        <Text style={styles.timeStyle}>{formatDate(timestamp)}</Text>
                    </View>
                    <Text style={styles.title}>{item.fields.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  }
    
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../../assets/tabicon/back.png')}/>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Header />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.sys.id}
        // contentContainerStyle={{ paddingVertical: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30
  },
  headerBackground: {
    width: '100%', 
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5683b0',
  },
  postContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    borderColor: '#5683b0',
    borderWidth: 0.3,
    backgroundColor: '#f9f9f9',
  },
  imageBox: {
    height: 65,
    width: 60,
    left: 5,
    // top: 20,
    // left: 0,
    // right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    marginTop: 5,
    fontSize: 15,
    color: 'gray'
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  organizer: {
    fontSize: 14,
    color: '#5683b0'
  },
  timeStyle: {
    fontSize: 14,
    color: 'gray'
  },
  organizerImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25
  },
  buttonContainer: {
    justifyContent: 'center'
  },
  backButton: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
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

export default MainScreen;
