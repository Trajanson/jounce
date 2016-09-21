"require strict";

import React                  from 'react';

import { Link }               from 'react-router';

import { createHistory }      from 'history';

import QueuedSongsStore       from './../../Stores/Queued_Songs_Store.jsx';

import Modes                  from './../../Constants/Modes.jsx';

let history = createHistory();

var AudioControlButtons = React.createClass({

  componentDidMount() {
    let unlisten = history.listen(this.handleRouteChange);
    this.queuedSongsStoreListener = QueuedSongsStore.addListener(this.updateStateFromQueuedSongsStore);

  },

  updateStateFromQueuedSongsStore() {
    let isInShuffleMode = QueuedSongsStore.isInnShuffleMode();
    let repeatMode = QueuedSongsStore.loopMode();
    this.setState({
      isInShuffleMode: isInShuffleMode,
      repeatMode: repeatMode,
    });
  },

  handleRouteChange(location) {
    // console.log(location);
  },

  componentWillUnmount() {
    unlisten();
  },

  getInitialState() {
    return({
      isInShuffleMode:       false,
      repeatMode: Modes.NO_LOOP_MODE,
      isOnQueuePage:         false,
    });
  },

  shuffleButtonClasses() {
    if (this.state.isInShuffleMode) {
      return "fa fa-random fa-lg clickable activated-audio-control-button";
    } else {
      return "fa fa-random fa-lg clickable";
    }
  },

  repeatButtonClasses() {
    if (this.state.repeatMode        === Modes.NO_LOOP_MODE) {
      return "fa fa-repeat fa-lg clickable";
    } else if (this.state.repeatMode === Modes.LOOP_PLAYLIST_MODE) {
      return "fa fa-repeat fa-lg clickable activated-audio-control-button";
    } else if (this.state.repeatMode === Modes.LOOP_SONG_MODE) {
      return "fa fa-repeat fa-lg clickable activated-audio-control-button fa-spin";
    }
  },

  handlePlayQueueClick() {

  },

  handleShuffleClick() {
    QueuedSongsStore.toggleShuffleMode();
  },

  handleRepeatClick() {
    QueuedSongsStore.toggleLoopModes();
  },

  render() {
    return (
      <div id="audio-control-buttons-container">
        <span className="controls">
          <Link className="inline" to="queue">
            <span onClick={this.handlePlayQueueClick} className="fa fa-list fa-lg clickable"></span>
          </Link>
          <span onClick={this.handleShuffleClick} className={ this.shuffleButtonClasses() }></span>
          <span onClick={this.handleRepeatClick} className={ this.repeatButtonClasses() }></span>
        </span>
      </div>
    );
  }

});

module.exports = AudioControlButtons;
