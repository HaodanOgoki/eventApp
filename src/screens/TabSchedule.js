import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['March 12', 'March 13', 'March 14', 'March 15'],
      tableData: [
        ['Opening', 'Opening Remarks', 'Breakfast', 'Closing Remarks'],
        ['Breakfast', 'Breakfast', 'Breakfast', 'Breakfast'],
        ['Session 1', 'President Message', 'CEO Photos', 'Conference'],
        ['Tradeshow Open', 'Tradeshow', 'Tradeshow Closing', 'Special Roundtable'],
        ['Group Meeting', 'Board Meeting', 'Presentation', 'Presentation'],
        ['Lunch', 'Lunch', 'Lunch', 'Lunch'],
        ['Lecture 1', 'Lecture 2', 'Lecture 3', 'Prizes & Draws'],
        ['Confernce Gala', 'Networking Event', 'Fashion Show', 'Closing Dinner']
      ]
    }
  }
  render() {

    const state = this.state;

    return (
      <Stack.Navigator>
        <Stack.Screen name="Schedule" component={Schedule} />
      </Stack.Navigator>
    );
  
    function Schedule() {
      return (
        <View style={styles.container}>
        <Text style={styles.title}>Conference Schedule</Text>
  
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={state.tableHead} style={styles.tablehead} />
            <Rows data={state.tableData} style={styles.tablebody} />
          </Table>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#D8D8D8',
    justifyContent: 'center',
    alignContent: 'center',
   },
  tablehead: { 
    height: 40, 
    backgroundColor: '#A7C1DA'
   },
   tablebody: { 
    height: 40, 
    backgroundColor: '#f1f8ff'
   },  text: { 
    margin: 6,
    backgroundColor: '#f1f8ff'
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
    textAlign: 'center',
    color: '#16343F'

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

