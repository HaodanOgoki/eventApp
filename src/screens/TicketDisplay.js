import React, { useState }  from 'react';
import { View, Text, Image, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const TicketDisplayScreen = ({ route, navigation }) => {
  const { title, location, category, description, imageUrl, dateTime, price } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);

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
        <Text style={styles.myTicket}>My Ticket</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Image style={styles.featuredImage} source={{ uri: `https:${ imageUrl }` }} />

          <View style={styles.favIconContainer}>
            <Image style={styles.favoriteIcon} source={require('../../assets/tabicon/success.png')} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            
            <View style={styles.postSubContainer}>
              <Image style={styles.postIcon} source= {require('../../assets/tabicon/calendarIcon.png')}/>
              <Text>{dateTime}</Text>
            </View>
            <View style={styles.postSubContainer}>
              <Image style={styles.postIcon} source= {require('../../assets/tabicon/location.png')}/>
              <Text>{location}</Text>
            </View>
            <View style={styles.postSubContainer}>
              <Image style={styles.postIcon} source= {require('../../assets/tabicon/price.png')}/>
              <Text>{price}</Text>
            </View>
           
            <View style={styles.barcodeContainer}>
              <Image style={styles.barcode} source= {require('../../assets/tabicon/barcode.png')}/>
            </View>
          
            {/* <View style={styles.categoryContainer}>
              <Text style={styles.category}>{category}</Text>
            </View> */}
            
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
    borderColor: '#5683b0',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 15,
    paddingVertical: 20,
    marginTop: -30,
    zIndex:1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    marginTop: 10
  },
  postSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  postIcon: {
    height: 20,
    width: 20,
    marginLeft: 20,
    marginRight: 10
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
  featuredImage: {
    marginTop: 50,
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  favIconContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
    zIndex: 2
  },
  favoriteIcon: {
    height: 50,
    width: 50
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  backButton: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 0,
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
  myTicket: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop:8,
    marginLeft: 30
  },
  barcodeContainer: {
    width: '100%',
    alignItems: 'center' 
  },
  barcode: {
    width: '100%', 
    height: 150, 
    resizeMode: 'contain',
  },

});

export default TicketDisplayScreen;
