import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator // app needs to render a navigator wich chooses between offline and onlie First
} from 'react-native';
import RouteChooser from './src/route-chooser';

var NVDB = React.createClass({
  getInitialState: function(){
    return {
    }
  },

  render: function(){
    return <RouteChooser/> //send some state information
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,

  },

})

AppRegistry.registerComponent('NVDB', () => NVDB);
