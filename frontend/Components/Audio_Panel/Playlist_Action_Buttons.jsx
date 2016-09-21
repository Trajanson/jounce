"require strict";

import React                       from 'react';

import Settings                   from './../../Constants/Settings.jsx';
import ActionQueueStore           from './../../Stores/Action_Queue_Store.jsx';
import QueuedSongsStore           from './../../Stores/Queued_Songs_Store.jsx';
import SongsInMemoryStore         from './../../Stores/Songs_In_Memory_Store.jsx';

var PlayListActionButtons = React.createClass({

  componentDidMount() {
    this.reverseClickTimerMutexSemaphore = false;
    this.reverseTrackClickTimer          = 0;
    this.songsInMemoryStoreListener = SongsInMemoryStore.addListener(this.updateStateToReflectSongsInMemoryStore);
  },

  componentWillUnmount() {
    this.songsInMemoryStoreListener.remove();
  },

  updateStateToReflectSongsInMemoryStore() {
    let currentSong       = QueuedSongsStore.currentSong(),
        currentSongNumber = currentSong.song_id,
        isPaused          = SongsInMemoryStore.isSongPaused(currentSongNumber);

    this.setState({
      isPaused: isPaused,
    });
  },

  getInitialState() {
    return ({
      isPaused: false,
    });
  },

  handlePreviousTrackSingleClick() {
    this.reverseTrackClickTimer = setTimeout(function() {
      console.log(this.reverseClickTimerMutexSemaphore);
      if (!this.reverseClickTimerMutexSemaphore) {
        console.log("rewind button single clicked!");
        let currentSong = QueuedSongsStore.currentSong(),
            currentSongNumber = currentSong.song_id;

        if ( SongsInMemoryStore.songIsLessThanXComplete(currentSongNumber) ) {
          ActionQueueStore.requestToMoveToThePreviousSong();
        } else {
          console.log("HANDLE MOVE TO PREVIOUS SONG");
          ActionQueueStore.requestToSeekToALocationInTheSong(0);
        }
        this.reverseClickTimerMutexSemaphore = false;
      };
    }.bind(this), Settings.DOUBLE_CLICK_DELAY_LENGTH);






  },

  handlePreviousTrackDoubleClick() {
    clearTimeout(this.reverseTrackClickTimer);
    this.reverseClickTimerMutexSemaphore = true;

    // reset single click handler
    setTimeout(function() {
      this.reverseClickTimerMutexSemaphore = false;
    }.bind(this), Settings.DOUBLE_CLICK_DELAY_LENGTH);

    // ACTION TO TAKE
    console.log("rewind button double clicked!");
    ActionQueueStore.requestToMoveToThePreviousSong();
  },

  handlePlayTrackClick() {
    if ( this.state.isPaused ) {
      console.log("PLAY REQUESTED");
      ActionQueueStore.requestToResumePlayForTheCurrentSong();
    } else {
      console.log("PAUSE REQUESTED");
      ActionQueueStore.requestToPauseTheCurrentSong();
    }
  },

  handleNextTrackClick() {
    console.log("USER REQUESTED NEXT TRACK CLICK");
    ActionQueueStore.requestToMoveToTheNextSong();
  },

  playPauseButtonClasses() {
    if ( this.state.isPaused ) {
      return "fa fa-play fa-stack-1x fa-inverse clickable";
    } else {
      return "fa fa-pause fa-stack-1x fa-inverse clickable";
    };
  },



  render() {
    return (
      <div className="audio-panel-buttons-container">
        <span onClick={this.handlePreviousTrackSingleClick}
              onDoubleClick={this.handlePreviousTrackDoubleClick}
              className="fa-stack fa-lg clickable">
              <span className="fa fa-circle fa-stack-2x"></span>
              <span className="fa fa-stack-1x fa-step-backward fa-inverse fa-lg clickable" ></span>
        </span>

        <span id="play-button-stack" onClick={this.handlePlayTrackClick} className="fa-stack fa-2x clickable">
          <span className="fa fa-circle fa-stack-2x"></span>
          <span className={ this.playPauseButtonClasses() }></span>
        </span>

        <span onClick={this.handleNextTrackClick} className="fa-stack fa-lg clickable">
          <span className="fa fa-circle fa-stack-2x"></span>
          <span className="fa fa-stack-1x fa-step-forward fa-inverse clickable"></span>
        </span>

      </div>
    );
  }

});

module.exports = PlayListActionButtons;
