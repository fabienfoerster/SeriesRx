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
        background={TouchableNativeFeedback.Ripple()}
        onPress={this.watchedEpisode}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{this.props.title}- {this.props.code}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  },

  watchedEpisode: function(){
    var BASE_URL = 'https://api.betaseries.com/episodes/watched';
    var PARAMS = '?key=' + this.props.apiKey + "&v=2.4" + "&token=" + this.props.token;
    var REQUEST_URL = BASE_URL + PARAMS;
    var formData = new FormData();
    formData.append("id",String(this.props.id));
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
      this.props.refresh();
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
