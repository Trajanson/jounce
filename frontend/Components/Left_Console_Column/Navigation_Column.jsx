"require strict";

import React                  from 'react';
import FollowedPlaylistsStore from './../../Stores/Followed_Playlists_Store.jsx';

import { Link }               from 'react-router';
import Settings               from './../../Constants/Settings.jsx';



var NavigationColumn = React.createClass({
  getInitialState() {
    return ({
      followedPlaylists: FollowedPlaylistsStore.followedPlaylists(),
    });
  },

  componentDidMount() {
    this.songPlaylistLibraryListener = FollowedPlaylistsStore.addListener(this.updateStateToReflectFollowedPlaylistsStore);
  },

  componentWillUnmount() {
    this.songPlaylistLibraryListener.remove();
  },

  updateStateToReflectFollowedPlaylistsStore() {
    let followedPlaylists = FollowedPlaylistsStore.followedPlaylists();
    this.setState({
      followedPlaylists: followedPlaylists,
    });
  },




  render() {
    let listOfPlaylistsFollowed = this.state.followedPlaylists.map(function(playlist, index) {
      let playlistId = playlist.id;
      return (
        <li key={index}>
          <span className="fa fa-music fa-fw"></span>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link className="customPlaylistName" to={`playlists/${String(playlistId)}`}>{ playlist.name }</Link>
        </li>
      );
    });

    return (

      <div id="navigation-column">
        <ul>
          <li><b>MAIN</b></li>
          <li>
            <Link to="explore">Browse</Link>
          </li>
          <li>
              <Link to="friends">Activity</Link>
          </li>
          <li>
            <Link to="radio">Radio</Link>
          </li>
        </ul>

        <ul>
          <li><b>MY MUSIC</b></li>
          <li>
            <Link to={ `playlists/${Settings.ROUTE_TO__FOLLOWED_SONGS_OF_CURRENT_USER}` }>Songs</Link>
          </li>

          <li>
            <Link to="followed_albums">Albums</Link>
          </li>

          <li>
            <Link to="followed_artists">Artists</Link>
          </li>


          <li onClick={this.props.openNewPlaylistModalAction}>
            New Playlist
          </li>

          { listOfPlaylistsFollowed }

        </ul>


      </div>
    );
  }

});

module.exports = NavigationColumn;
