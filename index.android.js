/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var config = require('./config.js');
var md5 = require('md5');
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


var SeriesRx = React.createClass({
  getInitialState: function() {
    return {
      logged: false,
      token : "",
      login : "",
      loginError : "",
      password : "",
      apiKey : config.betaseries_key,
    };
  },

  componentDidMount: function() {

  },



  betaseriesLogin: function() {
    var AUTH_URL = 'https://api.betaseries.com/members/auth';
    var PARAMS = '?key=' + this.state.apiKey;
    var REQUEST_URL = AUTH_URL + PARAMS ;
    var formData = new FormData();
    formData.append("login",this.state.login);
    formData.append("password",md5(this.state.password));
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.errors.length === 1) {
        this.setState({
          loginError : responseData.errors[0].text,
          login : "",
          password: ""
        });
      } else {
        this.setState({
          token: responseData.token,
          logged: true,
        });
      }
    })
    .done();
  },

  render: function() {
    if(!this.state.logged) {
      return this.renderLoginView();
    }



    return (

      <UnseenShowList apiKey={this.state.apiKey} token={this.state.token} />
    );
  },

  renderLoginView: function() {
    return (
      <View>
        <TextInput  value={this.state.login} onChangeText={(login) => this.setState({login})} placeholder="Enter your login" />
        <TextInput value={this.state.password} onChangeText={(password) => this.setState({password})}
          placeholder="Enter your password"
          secureTextEntry={true} />
        <TouchableNativeFeedback
          onPress={this.betaseriesLogin}
          background={TouchableNativeFeedback.Ripple() }>
          <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
            <Text style={{margin: 30}}>Login</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={{ height: 100, backgroundColor: 'green'}}>
          <Text> {this.state.loginError}</Text>
        </View>
      </View>
    );

  },




});

var styles = StyleSheet.create({

});

AppRegistry.registerComponent('SeriesRx', () => SeriesRx);
