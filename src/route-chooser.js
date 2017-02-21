
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  ScrollView,
  Navigator
} from 'react-native';


import {fetchFromAPI_all} from './wrapper';

//  Diverse url brukt i testing
var startURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96?kommune=101';
//var startURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/46?kommune=101&antall=1';
//var startURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/46?kommune=101';
//var startURL ='https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96?kommune=101&inkluder=alle';


var RouteChooser = React.createClass({
  getInitialState: function(){
    return {
      objects: [],  //array of objects from api
      fetching: false //bool used to display information whether or not a fetch is ongoing
    }
  },

  render: function() {
    return <View style = {styles.container}>
      <View style = {styles.header}>
          <Text> NVDB </Text>
      </View>
      <View style = {styles.middle}>
        {this.createGetButton()}
      </View>
      <View style = {styles.fetchingbar}>
          {this.createFetchingInfo()}
      </View>
      <View style={[styles.footer]}>
        <ScrollView>{this.showObjects()}</ScrollView>
      </View>
    </View>
  },
  // creating fething status information, to be replaced by loading view
  createFetchingInfo: function() {
    if(this.state.fetching == true){
      return <Text>Fetching...</Text>
    }
    else if (!this.state.fetching){
      return <Text>Not fetching</Text>
    }
  },

  createGetButton: function() {
    return <TouchableHighlight
      style ={styles.button}
      underlayColor="gray"
      onPress={this.handleGetPress}
      >
      <Text>
        get Data
      </Text>
    </TouchableHighlight>
  },

  handleGetPress: function() {
    console.log('#route-chooser.handlePress')
    this.setState({fetching: true});
    this.fetchFromAPI(startURL);
  },
  //creates the view which shows the contents in state.objects, used by render
  showObjects: function() {
    try {
      //console.log('route-chooser.showObjects');
      return this.state.objects.map(function(data, i){
        return <View key={i}>
          <Text>{data.id}</Text>
        </View>
      })
    }
    catch (error){
      //catcher error som skjer før data er hentet, objects er tom på det tidspunkt
    }

  },
  //fetches data associated with given url
  fetchFromAPI: function(url) {
    console.log('#route-chooser.fetchFromAPI');
    this.setState({
      objects: [],
    });
    this.setState({fetching: true});
    fetchFromAPI_all(this.updateState_Objects, url);
  },
  //updates state.objects(and state.fetch) with data
  updateState_Objects: function(objects, isFinalFetch){
    console.log('#updateState_Objects');
    console.log('--> objects is: ');
    console.log(objects);
    if(isFinalFetch == true){
      this.setState({fetching: false});
    }
    else{
      this.setState({fetching: true});
    }
    this.setState({objects});
  },
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff'
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f0f',
    margin: 20,
  },
  fetchingBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f0f',
    margin: 5,
  },
  footer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 2,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


module.exports = RouteChooser;
