"require strict";

import React                    from 'react';
import ViewedSongsStore         from './../../Stores/Viewed_Songs_Store.jsx';
import ViewedSongsActions       from './../../Actions/Viewed_Songs_Actions.jsx';

import Settings                 from './../../Constants/Settings.jsx';

import SongTable                from './Song_Table/Song_Table.jsx'

import { Link }                 from 'react-router';


var PlaylistViewer = React.createClass({
  playlistId() {
    return this.props.params.playlistId;
  },


  getInitialState() {
    return ({
      playlistDetails: {},
      songs: [],
    });
  },

  componentDidMount() {
    this.viewedSongsStoreListener = ViewedSongsStore.addListener(this.updateStateToReflectViewedSongsStore);

    switch (this.playlistId()) {
      case Settings.ROUTE_TO__FOLLOWED_SONGS_OF_CURRENT_USER:
        ViewedSongsActions.fetchSongsLikedByCurrentUser();

        break;
      default:
        ViewedSongsActions.retrieveSongsForPlaylist(this.playlistId());
    };
  },

  componentWillReceiveProps() {
    switch (this.playlistId()) {
      case Settings.ROUTE_TO__FOLLOWED_SONGS_OF_CURRENT_USER:
        ViewedSongsActions.fetchSongsLikedByCurrentUser();

        break;
      default:
        ViewedSongsActions.retrieveSongsForPlaylist(this.playlistId());
    };
  },

  componentWillUnmount () {
    this.viewedSongsStoreListener.remove();
  },

  updateStateToReflectViewedSongsStore() {
    let songs           = ViewedSongsStore.songs(),
        playlistDetails = ViewedSongsStore.songGroupDetails();
    this.setState({
      songs:           songs,
      playlistDetails: playlistDetails,
    });
  },

  handleFollowRequest () {
    ViewedSongsActions.followPlaylist(this.state.playlistDetails.playlist_id);
  },

  handleUnfollowRequest () {
    ViewedSongsActions.unfollowPlaylist(this.state.playlistDetails.playlist_id);
  },

  durationOfAllSongs() {
    let totalSeconds = ViewedSongsStore.durationOfAllSongs(),
        days,
        daysText = "",
        hours,
        hoursText = "",
        minutes = "",
        minutesText = "",
        seconds = totalSeconds,
        secondsText = "";

        minutes = Math.floor(seconds / 60);
        seconds = seconds - (minutes * 60);

        hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);

        days = Math.floor(hours / 24);
        hours = hours - (days * 24);

        if (days > 0) {
          daysText = `${days} Days, `;
        }

        if (hours > 0) {
          hoursText = `${hours} Hours, `;
        }

        if (minutes > 0) {
          minutesText = `${minutes} Minutes, `;
        }

        secondsText = `${seconds} Seconds`;
        return daysText + hoursText + minutesText + secondsText;
  },


  renderIsFollowedButton() {
    if (this.state.playlistDetails.is_followed ) {
      return (
        <button onClick={ this.handleUnfollowRequest }>
          Unfollow
        </button>
      );
    } else {
      return (
        <button onClick={ this.handleFollowRequest }>
          Follow
        </button>
      );
    }
  },

  renderNumberOfSongsText() {
    if (ViewedSongsStore.numberOfSongs() === 1) {
      return `${ViewedSongsStore.numberOfSongs()} Song`;
    } else {
      return `${ViewedSongsStore.numberOfSongs()} Songs`;
    }

  },




  render() {
    console.log(this.state);
    return (
      <div id="inner-core-content-container">
        <div className="music-table-container">
          <div className="music-table-header clearfix">

            <img className="music-table-photo" src={"http://design.ubuntu.com/wp-content/uploads/ubuntu-logo32.png"}></img>

              <div className="music-table-header-text">
                <div className="music-table-header-title">
                  {this.state.playlistDetails.playlist_name}
                </div>

                <div className="music-table-owner-name">
                  By <Link className="inline" to={ `users/${this.state.playlistDetails.creator_id}` }>{ this.state.playlistDetails.creator_name }</Link>
                </div>

                <div className="music-table-details">
                  <div className="music-table-total-number-of-songs">
                    { this.renderNumberOfSongsText() }
                 </div> •

                  <div className="music-table-total-duration">
                    { this.durationOfAllSongs() }
                  </div>
                </div>

              </div>
              <div className="music-table-followed-button-container">
                { this.renderIsFollowedButton() }
              </div>

            </div>


            <SongTable songs={this.state.songs}
                       openSongMenuModal={ this.props.openSongMenuModal }
            />
        </div>
      </div>
    );
  }

});

module.exports = PlaylistViewer;
