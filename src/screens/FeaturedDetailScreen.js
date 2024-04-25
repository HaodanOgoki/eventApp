import React from 'react';
import { View, Text, Image, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const PostDetailScreen = ({ route, navigation }) => {
  const { title, location, favorite, description, category, organizer, imageUrl, dateTime, imageUrl2, map, price } = route.params;
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
            <View style={styles.organizer}>
              <Image style={styles.organizerIcon} source={{ uri: `https:${ imageUrl2}`}} />
              <Text style={styles.organizerText}>{organizer}</Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{category}</Text>
            </View>
            
            <Text style={styles.subTitle}>About Event</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.locationContainer}>
              <Text style={styles.subTitle}>Location</Text>
              <Text style={styles.description}>{location}</Text>
              <View style={styles.mapContainer}>
                <MapView 
                  provider={PROVIDER_GOOGLE}
                  style={styles.mapView}
                  region={{
                    latitude: map.lat,
                    longitude: map.lon,
                    latitudeDelta:0.03,
                    longitudeDelta: 0.02
                  }}
                />
              </View>

            </View>

            <View style={styles.dateTimeContainer}>
              <Text style={styles.subTitle}>Date & Time</Text>
              <Text style={styles.description}>{dateTime}</Text>
              
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.subTitle}>Event Price</Text>
              <Text style={styles.description}>$ {price}</Text>
            </View>

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
