"require strict";

import React                  from 'react';

import { Link }               from 'react-router';

import { createHistory }      from 'history';

let history = createHistory();

var AudioControlButtons = React.createClass({

  componentDidMount() {
    let unlisten = history.listen(this.handleRouteChange);
  },

  handleRouteChange(location) {
    // console.log(location);
  },

  componentWillUnmount() {
    unlisten();
  },

  getInitialState() {
    return({
      shuffleButtonClasses:  "fa fa-random fa-lg clickable",
      repeatButtonClasses:   "fa fa-repeat fa-lg clickable",
      isInShuffleMode:       false,
      isOnQueuePage:         false,
    });
  },

  handlePlayQueueClick() {

  },

  handleShuffleClick() {

  },

  handleRepeatClick() {

  },

  render() {
    return (
      <div id="audio-control-buttons-container">
        <span className="controls">
          <Link className="inline" to="queue">
            <span onClick={this.handlePlayQueueClick} className="fa fa-list fa-lg clickable"></span>
          </Link>
          <span onClick={this.handleShuffleClick} className={this.state.shuffleButtonClasses}></span>
          <span onClick={this.handleRepeatClick} className={this.state.repeatButtonClasses}></span>
        </span>
      </div>
    );
  }

});

module.exports = AudioControlButtons;
