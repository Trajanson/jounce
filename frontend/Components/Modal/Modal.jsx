"require strict";

import React              from 'react';
import Modes              from './../../Constants/Modes.jsx';

import FollowedPlaylistsActions from './../../Actions/Followed_Playlists_Actions.jsx';

import NewPlaylistModal from './New_Playlist_Modal.jsx';
import SongMenuModal from './Song_Menu_Modal.jsx';

const Modal = React.createClass({


  handleClick(event) {
    event.stopPropagation();
  },

  render () {
    let content;
    if (this.props.modalContent === Modes.NEW_PLAYLIST_MODAL_CONTENT ) {
      content = (
          <NewPlaylistModal
            closeModal={this.props.closeModal}
       />
      )
    } else if (this.props.modalContent === Modes.SONG_MENU_MODAL_CONTENT) {
      content = (
        <SongMenuModal
          closeModal={  this.props.closeModal }
          modalSongId={ this.props.modalSongId }
          modalCurrentPlaylistId= { this.props.modalCurrentPlaylistId }
        />
      )
    } else {
      content = (
        <div></div>
      )
    }

    return (
      <div onClick={this.handleClick}
        id="myModal"
        className="modal"
        style={this.props.style}>
        { content }
      </div>
    );
  }
});

module.exports = Modal;
