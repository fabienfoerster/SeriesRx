'use strict';

var React = require('react-native');
var {
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet
} = React;

var Episode = require('./Episode');

var Show = React.createClass({
  propTypes: {
    show: React.PropTypes.object,
  },

  render: function() {
    return (

        <View style={styles.container}>
          <Text>{this.props.show.title}</Text>
          {this.props.show.unseen.map(function(episode) {
            return <Episode title={episode.title} code={episode.code} key={episode.id} />
          })}
        </View>

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
});

module.exports = Show;
