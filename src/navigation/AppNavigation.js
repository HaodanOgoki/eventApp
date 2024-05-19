import React, { useEffect } from "react";
import { useState } from "react";
import { User, onAuthStateChanged } from 'firebase/auth';
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabBar from "./BottomTabBar";
import TabScedule from "../screens/TabSchedule";
import TabCalendar from "../screens/TabCalendar";
import TabLive from "../screens/TabLive";
import Maps from "../screens/Maps";
import Home from "../screens/Home";
import TabFeaturedPosts from "../screens/TabFeaturedPosts";
import FeaturedDetailScreen from "../screens/FeaturedDetailScreen"
import appTabs from "../screens/OnBoarding";
import PostDetailScreen from "../screens/PostDetailScreen";
import TabBlogs from "../screens/TabBlogs";
import BlogDetailScreen from "../screens/BlogDetailScreen";
import TicketDisplayScreen from "../screens/TicketDisplay";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabAccount from "../screens/TabAccount";
// import InviteFriend from "../screens/AccountScreens/InviteFriend";
import Notification from "../screens/AccountScreens/Notification";
import ChatRoom from "../screens/AccountScreens/ChatRoom"
import PrivacyTerm from "../screens/AccountScreens/PrivacyTerm";
import Feedback from "../screens/AccountScreens/Feedback";
import FirebaseAuth from "../../components/firebaseConfig";


const Stack = createStackNavigator();

function Navigation() {

  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   onAuthStateChanged(FirebaseAuth, (user)=>{
  //     console.log('user', user);
  //     setUser(user);
  //   })

  //   return () => unsubscribe();
  // }, []);

  // if(!user) {
  //   return <Home/>
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerShown: false,
      }}
      initialRouteName="appTabs"
    >
      <Stack.Screen name="appTabs" component={appTabs} />
      <Stack.Screen name="BottomTabBar" component={BottomTabBar} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TabSchedule" component={TabScedule} />
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
      <Stack.Screen name="TabFeaturedPosts" component={TabFeaturedPosts} />
      <Stack.Screen name="FeaturedDetailScreen" component={FeaturedDetailScreen} />
      <Stack.Screen name="TabLive" component={TabLive} />
      <Stack.Screen name="TabBlogs" component={TabBlogs} />
      <Stack.Screen name="TabCalendar" component={TabCalendar} />
      <Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} />
      <Stack.Screen name="TicketDisplay" component={TicketDisplayScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="TabAccount" component={TabAccount} />
      <Stack.Screen name="Notification" component={Notification} />
      {/* <Stack.Screen name="InviteFriend" component={InviteFriend} /> */}
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="PrivacyTerm" component={PrivacyTerm} />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
    
  );
}

export default Navigation;
