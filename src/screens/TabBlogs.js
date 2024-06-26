import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView, SafeAreaView } from 'react-native';
import { createClient } from 'contentful';

const Contentful = createClient({
    space: 'f0ke2at73bdn',
    accessToken: 'QOqCqOf3sJfUBUuePTBPtoJyBi9PkJ74ztKw63xFav4',
  });

const MainScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true); 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Contentful.getEntries({ content_type: 'blogPost' });
        setData(response.items);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data from Contentful:', error);
      }
    };

    fetchData();
  }, []);

  const Header = () => (
    // <ImageBackground source={require('../../assets/bkg_pics/banner_bkg.png')} style={styles.headerBackground}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Blogs</Text>
      </View>
    // </ImageBackground>
  );

  const renderItem = ({ item }) => (
  
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('BlogDetailScreen', {
          title: item.fields.title,
          description: item.fields.body,
          imageUrl: item.fields.featuredImage.fields.file.url, 
          introduction: item.fields.introduction 
        })
      }>
      <View style={styles.postContainer}>
        <View style={styles.imageBox}>
          <Image style={styles.featuredImage} source= {{uri: `https:${ item.fields.featuredImage.fields.file.url }`}}/>
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
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image style={styles.loadingIcon} source={require('../../assets/tabicon/loading.gif')}  />
          <Text>Loading...</Text>
        </View>
      ):(
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.sys.id}
        contentContainerStyle={{ paddingVertical: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      )}
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
    alignItems: 'center',
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
