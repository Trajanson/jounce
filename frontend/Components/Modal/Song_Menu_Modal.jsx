"require strict";

import React              from 'react';

import FollowedPlaylistsActions from './../../Actions/Followed_Playlists_Actions.jsx';
import FollowedPlaylistsStore   from './../../Stores/Followed_Playlists_Store.jsx';


const Modal = React.createClass({

  followedPlaylists() {
    return FollowedPlaylistsStore.followedPlaylists();
  },

  handlePlaylistNameClick(event, playlistId) {
    FollowedPlaylistsActions.requestToAddSongToPlaylist(playlistId, this.props.modalSongId);
    this.props.closeModal();
  },

  handleRemoveSongFromPlaylistClick(event) {
    FollowedPlaylistsActions.requestToRemoveSongFromPlaylist(this.props.modalCurrentPlaylistId, this.props.modalSongId);
    this.props.closeModal();
  },

  renderRemoveFromPlaylistText() {
    if (this.props.modalCurrentPlaylistId) {
      return (
        <div onClick={ this.handleRemoveSongFromPlaylistClick }>
          Remove From Playlist
        </div>
      );
    } else {
      return (
          <div></div>
      );
    };
  },

  render () {
    let component = this;
    let followedPlaylists = this.followedPlaylists().map(function(playlist, index) {
      return (
        <div onClick={ () => { component.handlePlaylistNameClick(event, playlist.id) } } key={index} >
          { playlist.name }
        </div>
      );
    });




    return (
      <div className="modal-content">
        Playlists<br/>
      { followedPlaylists }<br/>
      { this.renderRemoveFromPlaylistText() }
      </div>
    );
  }
});

module.exports = Modal;
