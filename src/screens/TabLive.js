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
//   const [refreshing, setRefreshing] = React.useState(false);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, 
//   []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Contentful.getEntries({ content_type: 'liveFeed' });
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
        <Text style={styles.headerText}>Live</Text>
      </View>
    // </ImageBackground>
  );

  const renderItem = ({ item }) => (
     
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('PostDetailScreen', {
          title: item.fields.title,
          description: item.fields.description,
          organizer: item.fields.organizer,
          imageUrl: item.fields.feature.fields.file.url,   
          imageUrl2: item.fields.organizerIcon.fields.file.url,        
        })
      }>
      <View style={styles.postContainer}>
        <View style={styles.imageBox}>
          <Image style={styles.featuredImage} source= {{uri: `https:${ item.fields.feature.fields.file.url }`}}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.fields.title}</Text>
        </View>
       </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.sys.id}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5683b0',
  },
  postContainer: {
    // height: 280,
    width: '100%',
    marginBottom: 5,
    borderRadius: 15,
    // justifyContent: "center",
    overflow: "hidden",
    borderColor: '#b6b6b8',
    borderWidth: 1,
  },
  imageBox: {
    height: 170,
    // position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    backgroundColor: '#fff',
    // position: "absolute",
    // height: 150,
    width: "100%",
    // bottom: 0,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  featuredImage: {
    width: '100%',
    height: 170,
    top:-15,
    marginBottom: 10,
    resizeMode: 'cover'
  },
});

export default MainScreen;
