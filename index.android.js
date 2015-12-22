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
  DrawerLayoutAndroid,
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
    var navigationView = (

      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple()}
          onPress={this._removeToken}>
          <View>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Log out</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

    );


    if(! this.state.token) {
      return (
        <BetaseriesLogin apiKey={this.state.apiKey} addToken={this.addToken} />
      );
    }



    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={'DRAWER'}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <View style={{flex: 1}}>
          <ToolbarAndroid
            navIcon={require('./img/menu.png')}
            onIconClicked={ () => this.refs['DRAWER'].openDrawer()}
            style={styles.toolbar}
            title="SeriesRx" />
          <UnseenShowList apiKey={this.state.apiKey} token={this.state.token} />
        </View>
      </DrawerLayoutAndroid>
    );
  },







});

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'purple',
    height: 56,
  },
});

AppRegistry.registerComponent('SeriesRx', () => SeriesRx);
