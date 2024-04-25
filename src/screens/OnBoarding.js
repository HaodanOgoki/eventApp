import React, {useState, useRef} from 'react';
import { StyleSheet, View, Text, Button, FlatList, Image, Dimensions, useWindowDimensions, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Button from "../components/Button";

const Stack = createNativeStackNavigator();

function OnBoarding({ navigation }) {

  function renderBackground() {
    return (
      <ImageBackground
        source={require('../../assets/bkg_pics/onboardingbkg.png')}
        style={styles.backgroundImage}
      />
    );
  }

  function renderImage() {
    return (
      <View style={styles.iconContainer}>
        <Image 
          source={require('../../assets/bkg_pics/onboardingIcon.png')}
          style={styles.featuredImage}
        />
      </View>
    )
  }

  function renderDescription() {
    return (
      <View>
        <Text style={styles.text}>Explore, Connect, Innovate</Text>
        <Text style={styles.text}>Your adventure starts here!</Text>
      </View>
    );
  }

  function renderButton() {
    return(
      <View style={styles.onboardingButton}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('BottomTabBar')}
        />
      </View>
    );
  }

  return (    
      <View style={styles.container}>
        {renderBackground()}
        {renderImage()}
        {renderDescription()}
        {renderButton()}
      </View>
  );
}

export default OnBoarding

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#D8D8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#16343F'

  },
  body: {
    fontSize: 16,
    marginBottom: 10,
  },
  iconContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  featuredImage: {
    width: '70%',
    height: 300,
    marginBottom: 30,
  },
  onboardingButton: {
    width: '40%',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  }
});

