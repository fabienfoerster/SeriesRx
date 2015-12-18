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
        <View style={styles.episodeContainer}>
          <Text style={styles.episodeText}>{this.props.code} - {this.props.title}</Text>
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
  episodeContainer: {
    flex: 1,
    alignItems: 'center',
    height : 70,
    justifyContent: 'center',
    borderColor: 'purple',

    borderBottomWidth: 1,
  },
  episodeText: {
    textAlign: 'auto',


  },
  title: {

  },
});

module.exports = Episode;
