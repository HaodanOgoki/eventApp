# Ogoki Learning EventApp Standalone Installation Guide

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 14 or higher)
Yarn (optional)
Expo CLI (npm install -g expo-cli)
Firebase CLI (npm install -g firebase-tools)

Step 1: Clone the Repository
First, clone the repository to your local machine:

git clone https://github.com/HaodanOgoki/eventApp.git
cd eventAapp

Step 2: Install Dependencies
Install the necessary dependencies using npm or yarn:

npm install
or
yarn install

Step 3: Configure Firebase
Set up Firebase for authentication and other services. Ensure you have a Firebase project set up.
1.Install Firebase CLI (if not already installed):
npm install -g firebase-tools
2.Login to Firebase:
firebase login
3.Initialize Firebase in your project:
firebase init
During initialization, choose Firestore, Authentication, and Functions. Follow the prompts to set up Firebase in your project directory.
4.Update Firebase Configuration:
Update your firebaseConfig.js file in the components folder with your Firebase project's configuration details.

Step 4: Update App Configuration
Ensure your app.json is correctly set up with the required configurations:

{
  "expo": {
    "name": "eventieapp",
    "slug": "eventieapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.haodanogoki.eventieapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.haodanogoki.eventieapp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}

Step 5: Running the App Locally
Run the app locally:
npm start

Step 6: Deploying Your App
Deploy your standalone app to the respective app stores:
Google Play Store: Follow this guide to upload your APK/AAB.
Apple App Store: Follow this guide to upload your IPA.