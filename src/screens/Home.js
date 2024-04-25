import React, { useCallback, useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, FlatList, Dimensions,ImageBackground, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { createClient } from 'contentful';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import backgroundImage from '../assets/bkg_pics/bkg.png';


const Stack = createNativeStackNavigator();

const screen_width = Dimensions.get("window").width;

const Contentful = createClient({
  space: 'f0ke2at73bdn',
  accessToken: 'QOqCqOf3sJfUBUuePTBPtoJyBi9PkJ74ztKw63xFav4',
});

const ContentfulDataScreen = ({ navigation }) => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [livePosts, setLivePosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const Header = () => (
    <ImageBackground source={require('../../assets/bkg_pics/banner_bkg.png')} style={styles.headerBackground} >
    <View style={styles.headerContainer}>   
      <Text style={styles.headerText}>Welcome!</Text>
      {/* <TextInput
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
      /> */}
    </View>
    </ImageBackground>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuredResponse = await Contentful.getEntries({ content_type: 'featuredPosts' });
        setFeaturedEvents(featuredResponse.items);

        const blogResponse = await Contentful.getEntries({ content_type: 'blogPost' });
        setBlogs(blogResponse.items);

        const liveResponse = await Contentful.getEntries({ content_type: 'liveFeed' });
        setLivePosts(liveResponse.items);

      } catch (error) {
        console.error('Error fetching data from Contentful:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
   }, []);

  const filteredFeaturedEvents = featuredEvents.filter(item =>
    item.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBlogs = blogs.filter(item =>
    item.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLivePosts = livePosts.filter(item =>
    item.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  function renderFeaturedEvents(){

    const renderItemFeatured = ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('FeaturedDetailScreen', {
            title: item.fields.title,
            location: item.fields.location,
            favorite: item.fields.favorite,
            description: item.fields.description,
            category: item.fields.category,
            organizer: item.fields.organizer,
            imageUrl: item.fields.header.fields.file.url,   
            dateTime: item.fields.dateTime,
            map: item.fields.map,
            imageUrl2: item.fields.organizerIcon.fields.file.url,          
          })
        }>
        <View style={styles.featureContainer}>
          <View style={styles.imageBox}>
            <Image style={styles.featuredImage} source= {{uri: `https:${ item.fields.header.fields.file.url }`}}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.fields.title}</Text>
          </View>
          <View style={styles.postSubContainer}>
            <Image style={styles.postIcon} source= {require('../../assets/tabicon/calendarIcon.png')}/>
            <Text>{item.fields.dateTime}</Text>
          </View>
          <View style={styles.postSubContainer}>
            <Image style={styles.postIcon} source= {require('../../assets/tabicon/location.png')}/>
            <Text>{item.fields.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.postsContainer}>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Featured Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate("TabFeaturedPosts")}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredEvents}
          renderItem={renderItemFeatured}
          horizontal={true}
          keyExtractor={item => item.sys.id}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    );

  }

  function renderBlogs() {
    const renderItemBlogs = ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('BlogDetailScreen', {
            title: item.fields.title,
            description: item.fields.body,
            imageUrl: item.fields.featuredImage.fields.file.url,
          })
        }
      >
        <View style={styles.blogContainer}>
          <View style={styles.blogImageBox}>
            <Image
              style={styles.blogImage}
              source={{ uri: `https:${item.fields.featuredImage.fields.file.url}` }}
            />
          </View>
          <View style={styles.blogTextContainer}>
            <Text style={styles.title}>{item.fields.title}</Text>
            {/* <Text style={styles.body}>{item.fields.body}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.postsContainer}>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Blogs</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TabBlogs')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={blogs}
          renderItem={renderItemBlogs}
          horizontal={true}
          keyExtractor={(item) => item.sys.id}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    );
  }
  

  function renderLive(){

    const renderItemLive = ({ item }) => (
     
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
        <View style={styles.liveContainer}>
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
      <View style={styles.postsContainer}>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Live Posts</Text>
          <TouchableOpacity onPress={() => navigation.navigate("TabLive")}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={livePosts}
          renderItem={renderItemLive}
          horizontal={true}
          keyExtractor={item => item.sys.id}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    );
  }

  

  return (
    <ImageBackground source={require('../../assets/bkg_pics/bkg.png')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.containerStyle} showsVerticalScrollIndicator={false} nestedScrollEnabled={false}>
        <Header handleSearch={handleSearch} searchQuery={searchQuery} />
        <View style={styles.container}>         
          {renderFeaturedEvents()}
          {renderBlogs()}
          {renderLive()}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 15,
    // backgroundColor: 'blue'
  },
  headerContainer: {
    width: '100%', 
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },

  headerBackground: {
    width: '100%',
    // height: 200,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5683b0',
    marginTop: 25
  },
  searchBar: {
    width: '100%',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#5683b0',
  },
  subTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#5683b0',
    marginTop: 2,
    marginRight: 15
  },
  postIcon: {
    height: 20,
    width: 20,
    marginLeft: 20,
    marginRight: 10
  },
  featureContainer: {
    height: 270,
    width: 300,
    marginRight:10,
    marginBottom: 20,
    borderRadius: 15,
    // justifyContent: "center",
    overflow: "hidden",
    borderColor: '#b6b6b8',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  postSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  blogContainer: {
    // height: 150,
    width: 150,
    marginRight:10,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: 'center',
    overflow: "hidden",
  },
  blogImageBox: {
    top: 10,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  blogImage: {
    marginTop: 0,
    height: 120,
    width: 120,
    borderRadius: 60
  },
  blogTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  liveContainer: {
    height: 240,
    width: 300,
    marginRight:10,
    marginBottom: 20,
    borderRadius: 15,
    // justifyContent: "center",
    overflow: "hidden",
    borderColor: '#b6b6b8',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  imageBox: {
    height: 150,
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
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
  },
  body: {
    fontSize: 16,
    marginBottom: 10,
  },
  featuredImage: {
    width: '100%',
    height: 150,
    top:-15,
    marginBottom: 10,
    resizeMode: 'cover'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain'
  }
});

export default ContentfulDataScreen;






