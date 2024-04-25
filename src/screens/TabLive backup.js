import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { createClient } from 'contentful';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Contentful = createClient({
  space: 'f0ke2at73bdn',
  accessToken: 'QOqCqOf3sJfUBUuePTBPtoJyBi9PkJ74ztKw63xFav4',
});

const ContentfulDataScreen = () => {
  const [data, setData] = useState([]);

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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
          <Image style={styles.featuredImage} source= {{uri: `https:${ item.fields.feature.fields.file.url }`}}/>
        <View style={{backgroundColor: '#F1F8FF'}}>
          <Text style={styles.title}>{item.fields.title}</Text>
        </View>
        <View style={{backgroundColor: '#CFE4F5'}}>
          <Text style={styles.body}>{item.fields.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.sys.id}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

const LiveScreen = () => {

  function LiveScreen() {
    return (
    <View
      style={styles.container}>
      <View style={{flex: 1, backgroundColor: '#A7C1DA'}} />
      <View style={{flex: 2, backgroundColor: '#F1F8FF'}} />
      <View style={{flex: 3, backgroundColor: '#CFE4F5'}} />
    </View>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Live Feed" component={ContentfulDataScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
    postContainer: {
      alignItems: 'center', // Center horizontally
      marginBottom: 20,
    },
    itemContainer: {
      marginBottom: 20,
      paddingHorizontal: 0,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    body: {
      fontSize: 16,
      marginBottom: 10,
    },
    featuredImage: {
      width: '100%',
      height: 200,
      marginBottom: 10,
    },
  });

export default LiveScreen;