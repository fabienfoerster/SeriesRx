'use strict';

var React = require('react-native');
var  {
  ListView,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
} = React;

var Show = require('./Show');

var UnseenShowList = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderShow}
        style={styles.listView}
        />
    );
  },

  actualize: function() {
    this.fetchData();
  },

  fetchData: function() {
    var EPISODES_URL = 'https://api.betaseries.com/episodes/list';
    var LIMIT = 3;
    var EPISODES_PARAMS = '?key=' + this.props.apiKey + '&limit=' + LIMIT + '&v=2.4&token=' + this.props.token;
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

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading episodes...
        </Text>
      </View>
    );
  },



  renderShow: function(show) {
    return (
      <Show show={show} {...this.props} refresh={this.actualize} />
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
});


module.exports = UnseenShowList;
