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
        {this.props.show.unseen.map(episode => {
          return <Episode {...this.props} title={episode.title} code={episode.code} key={episode.id} id={episode.id}  />
        })}
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
