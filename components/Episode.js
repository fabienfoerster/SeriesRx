'use strict';

var React = require('react-native');
var {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} = React;

var Episode = React.createClass({
  render: function() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple() }>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{this.props.title}- {this.props.code}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  },

  watchedEpisode: function(){
    var BASE_URL = 'https://api.betaseries.com/episodes/watched';
    var PARAMS = '?key=' + this.props.apiKey;
    var REQUEST_URL = BASE_URL + PARAMS;
    var formData = new FormData();
    formData.append('id',this.props.show.id);
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
      console.log(responseData);
      this.props.action();
    })
    .done();

  },
  
});

var styles = StyleSheet.create({
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});

module.exports = Episode;
