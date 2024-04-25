import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabBar from "./BottomTabBar";
import TabScedule from "../screens/TabSchedule";
import TabLive from "../screens/TabLive";
import Maps from "../screens/Maps";
import Home from "../screens/Home";
import TabFeaturedPosts from "../screens/TabFeaturedPosts";
import FeaturedDetailScreen from "../screens/FeaturedDetailScreen"
import appTabs from "../screens/OnBoarding";
import PostDetailScreen from "../screens/PostDetailScreen";
import TabBlogs from "../screens/TabBlogs";
import BlogDetailScreen from "../screens/BlogDetailScreen";

const Stack = createStackNavigator();

function Navigation() {
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
      <Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} />
    </Stack.Navigator>
    
  );
}

export default Navigation;
