'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableNativeFeedback,
  AsyncStorage,

} = React;

var md5 = require('md5');
var STORAGE_KEY = require("../config.js").STORAGE_KEY;
var BetaseriesLogin = React.createClass({
  getInitialState: function() {
    return {
      login: "",
      password: "",
      loginError: "",
    };
  },

  async _storeToken(token) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY,token)
    } catch (error) {
      console.log(error);
    }
  },

  betaseriesLogin: function() {
    var AUTH_URL = 'https://api.betaseries.com/members/auth';
    var PARAMS = '?key=' + this.props.apiKey;
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
        this._storeToken(responseData.token).done();
        this.props.addToken(responseData.token);
      }
    })
    .done();
  },

  render: function() {
    return (
      <View>
        <Text style={styles.title}>SerieRx</Text>
        <TextInput  value={this.state.login} onChangeText={(login) => this.setState({login})} placeholder="Enter your login" />
        <TextInput value={this.state.password} onChangeText={(password) => this.setState({password})}
          placeholder="Enter your password"
          secureTextEntry={true} />
        <TouchableNativeFeedback
          onPress={this.betaseriesLogin}
          background={TouchableNativeFeedback.Ripple() }>
          <View style={styles.loginButton}>
            <Text style={{margin: 30}}>Login</Text>
          </View>
        </TouchableNativeFeedback>
        <View >
          <Text style={{color:'red', textAlign:'center'}}> {this.state.loginError}</Text>
        </View>
      </View>
    );

  },

});

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginButton: {
    backgroundColor: 'purple',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    color: 'purple',
  }
});

module.exports = BetaseriesLogin;
