/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var config = require('./config.js');

var {
  AppRegistry,
  Image,
  ListView,
  ToolbarAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} = React;

var UnseenShowList = require('./components/UnseenShowList');
var BetaseriesLogin = require('./components/BetaseriesLogin');


var SeriesRx = React.createClass({
  getInitialState: function() {
    return {
      token : "",
      apiKey : config.betaseries_key,
    };
  },

  componentDidMount: function() {

  },

  addToken: function(token) {
    this.setState({
      token: token,
    });
  },





  render: function() {
    if(! this.state.token) {
      return (
        <BetaseriesLogin apiKey={this.state.apiKey} addToken={this.addToken} />
      );
    }



    return (

      <UnseenShowList apiKey={this.state.apiKey} token={this.state.token} />
    );
  },






});

var styles = StyleSheet.create({

});

AppRegistry.registerComponent('SeriesRx', () => SeriesRx);
