"require strict";

import React                      from 'react';
import Settings                   from './../../Constants/Settings.jsx';


var VolumeControlBar = React.createClass({

  getInitialState() {
    return ({
      volume: Settings.STARTING_VOLUME_LEVEL,
    });
  },

  handleVolumeClick(event) {
    let volumeBar = $('#song-volume-bar'),
        percentOfMaxVolume = (event.clientX - volumeBar.offset().left) / volumeBar.width();
    this.setState({
      volume: percentOfMaxVolume,
    });
    console.log("volume button clicked");
  },

  currentSongVolumeBarStyle() {
    return {
      width: `${this.state.volume * 100}%`,
    };
  },

  render() {
    return (
      <div id="volume-control-buttons-container">
        <span id="volume-control">
          <span className="fa fa-volume-up fa-lg"></span>
        </span>

        <div onClick={ this.handleVolumeClick } id="song-volume-bar" className="clickable">
          <div style={ this.currentSongVolumeBarStyle() } id="song-volume-bar-filled-up">

          </div>
        </div>
      </div>
    );
  }


});

module.exports = VolumeControlBar;
