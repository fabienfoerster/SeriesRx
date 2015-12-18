/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var config = require('./config.js');
var STORAGE_KEY = config.STORAGE_KEY;
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
  AsyncStorage,
} = React;

var UnseenShowList = require('./components/UnseenShowList');
var BetaseriesLogin = require('./components/BetaseriesLogin');
var toolbarActions = [
  {title: 'Log out',},
];

var SeriesRx = React.createClass({
  getInitialState: function() {
    return {
      token : "",
      apiKey : config.betaseries_key,
    };
  },

  async _loadToken() {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if(value != null) {
        this.setState({
          token : value,
        });
      }
    } catch(error) {
      console.log(error);
    }
  },

  async _removeToken() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      this.setState({
        token: "",
      });
    } catch(error) {
      console.log(error);
    }
  },

  componentDidMount: function() {
    this._loadToken().done();
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
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={toolbarActions}
          onActionSelected={this._onActionSelected}
          style={styles.toolbar}
          title="SeriesRx" />
        <UnseenShowList apiKey={this.state.apiKey} token={this.state.token} />
      </View>
    );
  },

  _onActionSelected : function(position) {
    if(position === 0) { // index of 'Log out'
      this._removeToken().done();
    }
  },






});

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'purple',
    height: 56,
  },
});

AppRegistry.registerComponent('SeriesRx', () => SeriesRx);
