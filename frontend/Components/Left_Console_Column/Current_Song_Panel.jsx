"require strict";

import React              from 'react';

import QueuedSongsStore   from './../../Stores/Queued_Songs_Store.jsx';


var CurrentSongPanel = React.createClass({

  getInitialState() {
    let currentSongDetails = QueuedSongsStore.currentSong();
    return ({
      album_cover_path: currentSongDetails.album_cover_path,
      songTitle:        currentSongDetails.title,
      artistName:       currentSongDetails.artist_name,
    });
  },

  componentDidMount() {
    this.queuedSongStoreListener    = QueuedSongsStore.addListener(this.updateStateToReflectQueuedSongStore);
  },

  componentWillUnmount () {
  this.queuedSongStoreListener.remove();
  },

  updateStateToReflectQueuedSongStore() {
    let currentSongDetails = QueuedSongsStore.currentSong();
    this.setState({
      album_cover_path: currentSongDetails.album_cover_path,
      songTitle:        currentSongDetails.title,
      artistName:       currentSongDetails.artist_name,
    });
  },


  render() {
    return (
      <div id="current-song-panel">
        <img className="current-song-album-cover" src={this.state.album_cover_path} />

        <div className="current-song-title-display">
          {this.state.songTitle}
        </div>

        <div className="current-song-artist-display">
          {this.state.artistName}
        </div>
      </div>
    );
  }

});

module.exports = CurrentSongPanel;
