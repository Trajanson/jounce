import React                                from 'react';

import SongsInMemoryStore                   from './../../Stores/Songs_In_Memory_Store.jsx';
import QueuedSongsStore                     from './../../Stores/Queued_Songs_Store.jsx';

import ActionQueueStore                     from './../../Stores/Action_Queue_Store.jsx';

var SongProgressBar = React.createClass({

  getInitialState() {
    return ({
      currentSongTime:     0,
      currentSongDuration: 0,
    });
  },

  componentDidMount() {
    this.songsInMemoryStoreListener = SongsInMemoryStore.addListener(this.updateStateToReflectSongsInMemoryStore);
  },

  componentWillUnmount() {
    this.songsInMemoryStoreListener.remove();
  },


  updateStateToReflectSongsInMemoryStore() {
    let currentSongNumber   = QueuedSongsStore.currentSong().song_id,
        currentSongTime     = SongsInMemoryStore.currentTimeForSongNumber(currentSongNumber),
        currentSongDuration = SongsInMemoryStore.durationForSongNumber(currentSongNumber);
    this.setState({
      currentSongTime:     currentSongTime,
      currentSongDuration: currentSongDuration,
    });
  },


  positionInCurrentSong() {
    let locationInSong = this.state.currentSongTime || 0;
    return this.renderTimeAsString(locationInSong);
  },

  lengthOfCurrentSong() {
    let songDuration = this.state.currentSongDuration || 0;
    return this.renderTimeAsString(songDuration);
  },

  renderTimeAsString(time) {
    let currentTime = Math.floor(time),
        seconds     = currentTime % 60,
        minutes     = (currentTime - seconds) / 60;
        if (seconds < 10) {
          seconds = "0" + String(seconds);
        }
    return `${minutes}:${seconds}`;
  },

  songProgressMarkerStyle() {
    let widthPercent = this.state.currentSongTime / this.state.currentSongDuration;
    return {
      width: `${widthPercent * 100}%`,
    };
  },

  handleProgressBarClick(event) {
    let songProgressBar = $('#song-progress-bar'),
        percentCompleted = (event.clientX - songProgressBar.offset().left) / songProgressBar.width();

    ActionQueueStore.requestToSeekToALocationInTheSong(percentCompleted * this.state.currentSongDuration);
    // console.log("PROGRESS BAR CLICKED", percentCompleted * this.state.currentSongDuration);
  },

  render() {
    return (
      <section className="current-song-progress-container">
          <div id="time-value-within-current-song" >{this.positionInCurrentSong()}</div>

        <div onClick={ this.handleProgressBarClick } id="song-progress-bar">
          <div style={this.songProgressMarkerStyle()} className="song-progress-marker">

          </div>
        </div>

          <div id="total-time-for-current-song">{this.lengthOfCurrentSong()}</div>




      </section>
    );
  }

});

module.exports = SongProgressBar;
