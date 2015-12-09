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

var API_KEY = config.betaseries_key;




var SeriesRx = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      logged: false,
      token : "",
      login : "",
      loginError : "",
      password : "",
    };
  },

  componentDidMount: function() {

  },

  fetchData: function(token) {
    var EPISODES_URL = 'https://api.betaseries.com/episodes/list';
    var LIMIT = 1;
    var EPISODES_PARAMS = '?key=' + API_KEY + '&limit=' + LIMIT + '&v=2.4&token=' + token;
    var REQUEST_URL = EPISODES_URL + EPISODES_PARAMS;
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.shows),
        loaded: true,
      });
    })
    .done();
  },

  betaseriesLogin: function() {
    var AUTH_URL = 'https://api.betaseries.com/members/auth';
    var PARAMS = '?key=' + API_KEY;
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
        this.fetchData(this.state.token);
      }
    })
    .done();
  },

  render: function() {
    if(!this.state.logged) {
      return this.renderLoginView();
    }

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderEpisode}
      style={styles.listView}
      />
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

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
      <Text>
      Loading episodes...
      </Text>
      </View>
    );
  },

  renderEpisode: function(show) {
    return (

      <View style={styles.container}>
      <View style={styles.rightContainer}>
      <Text style={styles.title}>{show.title}- S{show.unseen[0].season}E{show.unseen[0].episode}</Text>
      <Text style={styles.year}>{show.unseen[0].description}</Text>
      </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('SeriesRx', () => SeriesRx);
