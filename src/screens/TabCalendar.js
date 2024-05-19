import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, RefreshControl, FlatList, StyleSheet } from "react-native";
import { createClient } from "contentful";

// Initialize Contentful client
const Contentful = createClient({
  space: "f0ke2at73bdn",
  accessToken: "QOqCqOf3sJfUBUuePTBPtoJyBi9PkJ74ztKw63xFav4",
});

export default function CalendarScreenAgenda() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Contentful.getEntries({
          content_type: "featuredPosts",

        });

        const sortedPosts = response.items.sort((a, b) => 
          new Date(b.fields.dateTime) - new Date(a.fields.dateTime)
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const Header = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Calendar</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      // onPress={() =>
      //   navigation.navigate('EventDetailScreen', {
      //     title: item.fields.title,
      //     dateTime: item.fields.dateTime,
      //     description: item.fields.description,
      //     imageUrl: item.fields.image.fields.file.url,
      //   })
      // }
      >
      <View style={styles.postContainer}>
        {/* <View style={styles.imageBox}>
        <Image style={styles.featuredImage} source= {{uri: `https:${ item.fields.header.fields.file.url }`}}/>
        </View> */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.fields.title}</Text>
          <Text style={styles.dateTime}>{item.fields.dateTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    

    <View style={styles.container}>
      <Header />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.sys.id}
        contentContainerStyle={{ paddingVertical: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
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
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: '#b6b6b8',
    borderWidth: 1,
  },
  imageBox: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#fff',
    width: '100%',
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  featuredImage: {
    width: '100%',
    height: 170,
    marginBottom: 10,
    resizeMode: 'cover',
  },
});
