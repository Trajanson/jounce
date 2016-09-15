"require strict";

import React                    from 'react';
import ViewedSongsStore         from './../../Stores/Viewed_Songs_Store.jsx';
import ViewedSongsActions       from './../../Actions/Viewed_Songs_Actions.jsx';

import SongTable                from './Song_Table/Song_Table.jsx'
import { Link }                 from 'react-router';


var AlbumViewer = React.createClass({
  albumId() {
    return this.props.params.albumId;
  },

  getInitialState() {
    return ({
      albumDetails: {},
      songs: [],
    });
  },

  componentDidMount() {
    this.viewedSongsStoreListener = ViewedSongsStore.addListener(this.updateStateToReflectViewedSongsStore);
    ViewedSongsActions.retrieveSongsForAlbum(this.albumId());
  },

  componentWillUnmount () {
    this.viewedSongsStoreListener.remove();
  },

  componentWillReceiveProps() {
    ViewedSongsActions.retrieveSongsForAlbum(this.albumId());
  },


  updateStateToReflectViewedSongsStore() {
    let songs        = ViewedSongsStore.songs(),
        albumDetails = ViewedSongsStore.songGroupDetails();
    this.setState({
      songs:        songs,
      albumDetails: albumDetails,
    });
  },


  handleFollowRequest () {
    ViewedSongsActions.followAlbum(this.state.albumDetails.album_id);
  },

  handleUnfollowRequest () {
    ViewedSongsActions.unfollowAlbum(this.state.albumDetails.album_id);
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

  renderNumberOfSongsText() {
    if (ViewedSongsStore.numberOfSongs() === 1) {
      return `${ViewedSongsStore.numberOfSongs()} Song`;
    } else {
      return `${ViewedSongsStore.numberOfSongs()} Songs`;
    }
  },

  renderIsFollowedButton() {
    if (this.state.albumDetails && this.state.albumDetails.is_followed ) {
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

  render() {
    console.log(this.state.albumDetails);
    return (
      <div id="inner-core-content-container">
        <div className="music-table-container">
          <div className="music-table-header clearfix">

            <img className="music-table-photo" src={this.state.albumDetails.album_cover_path}></img>

            <div className="music-table-header-text">
              <div className="music-table-header-title">
                {this.state.albumDetails.album_title}
              </div>

              <div className="music-table-owner-name">
                By <Link className="inline" to={ `artists/${this.state.albumDetails.album_id}` }>{ this.state.albumDetails.artist_name }</Link>
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

module.exports = AlbumViewer;
