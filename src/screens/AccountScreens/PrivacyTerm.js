import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity, Share, Modal } from 'react-native';

const PrivacyTerm = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  []);

  return (
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../../../assets/tabicon/back.png')}/>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={styles.title}>Privacy & Terms</Text>
          <View style={styles.textContainer}>
            <View style={styles.sectionBox}>
                <Text style={styles.subtitle}>Privacy Policy</Text>
                <Text style={styles.content}>At [Your Event App Name], we take your privacy seriously. This Privacy Policy outlines how we collect, use, share, and protect your personal information when you use our services.</Text>
            </View>            

            <View style={styles.sectionBox}>
                <Text style={styles.subtitle}>Information Collection and Use</Text>
                <Text style={styles.content}>We collect various types of information to provide and improve our services to you. This includes:</Text>
                <Text style={styles.content}>Personal Information: When you register or interact with our app, we may collect personal information such as your name, email address, and phone number.</Text>
                <Text style={styles.content}>Usage Data: We collect data about how you use our app, including your interactions with features, preferences, and device information.</Text>
                <Text style={styles.content}>Location Information: With your consent, we may collect location data to provide location-based services like event recommendations and navigation.</Text>
            </View>
            
            <View style={styles.sectionBox}>
                <Text style={styles.subtitle}>Information Collection and Use</Text>
                <Text style={styles.content}>We collect various types of information to provide and improve our services to you. This includes:</Text>
                <Text style={styles.content}>Personal Information: When you register or interact with our app, we may collect personal information such as your name, email address, and phone number.</Text>
                <Text style={styles.content}>Usage Data: We collect data about how you use our app, including your interactions with features, preferences, and device information.</Text>
                <Text style={styles.content}>Location Information: With your consent, we may collect location data to provide location-based services like event recommendations and navigation.</Text>
            </View>
            
            <View style={styles.sectionBox}>
                <Text style={styles.subtitle}>Information Collection and Use</Text>
                <Text style={styles.content}>We collect various types of information to provide and improve our services to you. This includes:</Text>
                <Text style={styles.content}>Personal Information: When you register or interact with our app, we may collect personal information such as your name, email address, and phone number.</Text>
                <Text style={styles.content}>Usage Data: We collect data about how you use our app, including your interactions with features, preferences, and device information.</Text>
                <Text style={styles.content}>Location Information: With your consent, we may collect location data to provide location-based services like event recommendations and navigation.</Text>  
            </View>          
          </View>        
        </View>
      </ScrollView>
    </SafeAreaView>
    
);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 5,
    alignItems: 'center'
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    color: '#5683b0',
  },
  sectionBox: {
    marginBottom: 15
  },
  subtitle: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#5683b0',
    marginVertical: 15
  },
  content: {
    fontSize: 14,
    color: '#777', 
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
  textContainer: {
   
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    padding: 20
  },
});

export default PrivacyTerm;
