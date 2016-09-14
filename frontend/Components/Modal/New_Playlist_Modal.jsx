"require strict";

import React              from 'react';

import FollowedPlaylistsActions from './../../Actions/Followed_Playlists_Actions.jsx';


const Modal = React.createClass({

  componentDidUpdate() {
    document.getElementById("modal-playlist-name-input").focus();
  },

  getInitialState() {
    return ({
      playlistName: "",
    });
  },

  handlePlaylistNameChange(event) {
    const newPlaylistName = event.target.value;
    console.log(newPlaylistName);
    this.setState({
      playlistName: newPlaylistName,
    });
  },

  handleSubmit (event) {
    event.preventDefault();
    const postData = {
      playlist: {
        name: this.state.playlistName,
      },
    };
    FollowedPlaylistsActions.createPlaylist(postData);
    this.setState({
      playlistName: "",
     });
    this.props.closeModal();
  },

  handleClick(event) {
    event.stopPropagation();
  },

  render () {
    return (
      <div className="modal-content">
        <form onSubmit={this.handleSubmit} >
          <input type="text"
                 onChange={ this.handlePlaylistNameChange }
                 id="modal-playlist-name-input"
                 placeholder="New Playlist"
                 value={this.state.playlistName}>
          </input>
        </form>
      </div>
    );
  }
});

module.exports = Modal;
