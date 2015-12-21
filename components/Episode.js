'use strict';

var React = require('react-native');
var {
  TouchableNativeFeedback,
  StyleSheet,
} = React;

var { createAnimatableComponent,View, Text } = require('react-native-animatable');

var Episode = React.createClass({
  render: function() {
    return (
      <View style={styles.episodeContainer} animation="lightSpeedIn">
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple()}
          onPress={this.watchedEpisode}>
          <View >
            <Text style={styles.episodeText}  >{this.props.code} - {this.props.title}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
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
    marginBottom: 3,
    backgroundColor: 'lightgray',
  },
  episodeText: {
    textAlign: 'auto',

  },
  title: {

  },
});

module.exports = Episode;
