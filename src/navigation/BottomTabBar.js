import { Image } from "react-native";
import React from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

import Maps from "../screens/Maps";
import Credits from "../screens/Credits";
import Home from "../screens/Home";
import TabFeaturedPosts from "../screens/TabFeaturedPosts"
import TabCalendar from "../screens/TabCalendar";
import TabLive from "../screens/TabLive";
import TabBlogs from "../screens/TabBlogs"
import TabAccount from "../screens/TabAccount";

const Tab = AnimatedTabBarNavigator();

export default function App() {
  return (
        <Tab.Navigator
          initialRouteName="Home"
          tabBarStyle={{ backgroundColor: 'transparent' }}
          appearance={{
            tabBarBackground: "transparent",
            floating: false,
            whenActiveShow: "label-only",
          }}
          tabBarOptions={{
            activeTintColor: "#569DB5",
            inactiveTintColor: "#569DB5",
            // activeBackgroundColor: "#187CED",
            activeBackgroundColor:"white",
          }}
        >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={require("../../assets/tabicon/home.png")}
                style={{ height: 24, width: 24 }}
              />
            ),
          }}
        />     
        <Tab.Screen
          name="TabFeaturedPosts"
          component={TabFeaturedPosts}
          options={{
            tabBarLabel: "Featured",
            tabBarIcon: ({ focused, size }) => (
              <Image
              source={require("../../assets/tabicon/featured.png")}
              style={{ height: 24, width: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TabBlogs"
          component={TabBlogs}
          options={{
            tabBarLabel: "Blogs",
            tabBarIcon: ({ focused, size }) => (
              <Image
              source={require("../../assets/tabicon/blogs.png")}
              style={{ height: 24, width: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TabCalendar"
          component={TabCalendar}
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={require("../../assets/tabicon/schedule.png")}
                style={{ height: 24, width: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TabLive"
          component={TabLive}
          options={{
            tabBarLabel: "Live",
            tabBarIcon: ({ focused, size }) => (
              <Image
              source={require("../../assets/tabicon/live.png")}
              style={{ height: 24, width: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TabAccount"
          component={TabAccount}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ focused, size }) => (
              <Image
              source={require("../../assets/tabicon/account.png")}
              style={{ height: 24, width: 24 }}
              />
            ),
          }}
        />
        </Tab.Navigator>
      
  );
}
