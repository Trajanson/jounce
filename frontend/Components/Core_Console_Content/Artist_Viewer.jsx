"require strict";

import React                    from 'react';
import ViewedSongsStore         from './../../Stores/Viewed_Songs_Store.jsx';
import ViewedSongsActions       from './../../Actions/Viewed_Songs_Actions.jsx';

import SongTable                from './Song_Table/Song_Table.jsx'


var ArtistViewer = React.createClass({

  artistId() {
    return this.props.params.artistId;
  },

  getInitialState() {
    return ({
      artistDetails: {},
      songs: [],
    });
  },

  componentDidMount() {
    this.viewedSongsStoreListener = ViewedSongsStore.addListener(this.updateStateToReflectViewedSongsStore);
    ViewedSongsActions.retrieveSongsForArtist(this.artistId());
  },

  componentWillUnmount () {
    this.viewedSongsStoreListener.remove();
  },

  componentWillReceiveProps() {
    ViewedSongsActions.retrieveSongsForArtist(this.artistId());
  },

  updateStateToReflectViewedSongsStore() {
    let songs         = ViewedSongsStore.songs(),
        artistDetails = ViewedSongsStore.songGroupDetails();
    this.setState({
      songs:         songs,
      artistDetails: artistDetails,
    });
  },

  handleFollowRequest () {
    ViewedSongsActions.followArtist(this.state.artistDetails.artist_id);
  },

  handleUnfollowRequest () {
    ViewedSongsActions.unfollowArtist(this.state.artistDetails.artist_id);
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
    if (this.state.artistDetails && this.state.artistDetails.is_followed ) {
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
    return (
      <div id="inner-core-content-container">
        <div className="music-table-container">
          <div className="music-table-header clearfix">

            <img className="music-table-photo" src={this.state.artistDetails.artist_image_path}></img>

            <div className="music-table-header-text">
              <div className="music-table-header-title">
                {this.state.artistDetails.artist_name}
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
    );  }

});

module.exports = ArtistViewer;
