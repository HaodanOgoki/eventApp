import { View, Text, Image, StyleSheet, RefreshControl, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { Agenda } from "react-native-calendars";
import { createClient } from "contentful";

// Initialize Contentful client
const Contentful = createClient({
  space: "f0ke2at73bdn",
  accessToken: "QOqCqOf3sJfUBUuePTBPtoJyBi9PkJ74ztKw63xFav4",
});

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};
function extractTime(dateTimeString) {
  const timeWithOffset = dateTimeString.split("T")[1]; // Gets "08:30-05:00"
  const timeOnly = timeWithOffset.split("-")[0]; // Gets "08:30"
  return convertTo12Hour(timeOnly);
}
function convertTo12Hour(timeString) {
  const [hour24, minute] = timeString.split(":");
  const hourNumber = parseInt(hour24, 10);
  const suffix = hourNumber >= 12 ? "PM" : "AM";
  const hour12 = hourNumber % 12 || 12;

  return `${hour12}:${minute} ${suffix}`;
}

export default function CalendarScreenAgenda() {
  const [items, setItems] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await Contentful.getEntries({
          content_type: "featuredPosts",
        });

        const fetchedItems = response.items.reduce((acc, item) => {
          const dateStr = item.fields.dateTime.split("T")[0];

          if (!acc[dateStr]) {
            acc[dateStr] = [];
          }

          acc[dateStr].push({
            key: item.sys.id,
            time: extractTime(item.fields.dateTime),
            location: item.fields.location || "No Loaction",
            name: item.fields.title || "Unnamed Event",
          });

          return acc;
        }, {});

        setItems(fetchedItems);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching events from Contentful:", error);
      }
    };

    fetchEvents();
  }, []);

  const Header = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Calendar</Text>
    </View>
  );

  const renderEmptyData = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No events today.</Text>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View key={item.key} style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemTime}>{item.time}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
      </View>
    );
  };

  return (
    

    <SafeAreaView style={styles.container}>
      <Header />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image style={styles.loadingIcon} source={require('../../assets/tabicon/loading.gif')}  />
          <Text>Loading...</Text>
        </View>
      ):(
      <Agenda
        items={items}
        selected={timeToString(new Date())}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      ></Agenda>
      )}
    </SafeAreaView>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingIcon: {
    height: 50,
    width: 50
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
    height: 125,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    margin: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  itemTime: {
    fontSize: 20,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemLocation: {
    paddingTop: 5,
    color: "#808080",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888888",
  },
});
