"require strict";

import React                    from 'react';
import { Link }                 from 'react-router';

import RatingStars              from './Rating_Stars.jsx'

import ViewedSongsActions       from './../../../Actions/Viewed_Songs_Actions.jsx';
import ActionQueueStore         from './../../../Stores/Action_Queue_Store.jsx';

import ViewedSongsStore         from './../../../Stores/Viewed_Songs_Store.jsx';
import SongsInMemoryStore       from './../../../Stores/Songs_In_Memory_Store.jsx';
import QueuedSongsStore         from './../../../Stores/Queued_Songs_Store.jsx';


var TableRow = React.createClass({
  getInitialState() {
    return ({
      displayStyle: {
        visibility:       "hidden",
      },
      isCurrentlyPlaying: false,
    });
  },

  componentDidMount() {
    // this.viewedSongsStoreListener   = ViewedSongsStore.addListener(this.updateStateFromViewedSongsStore);
    this.songsInMemoryStoreListener = SongsInMemoryStore.addListener(this.updateStateFromSongsInMemoryStore);
  },

  componentWillUnmount() {
    // this.viewedSongsStoreListener.remove();
    this.songsInMemoryStoreListener.remove();
  },

  updateStateFromSongsInMemoryStore() {
    let songId                 = this.props.songId,
        currentlyPlayingSongId = QueuedSongsStore.currentSong().song_id,
        isCurrentSong          = songId === currentlyPlayingSongId,
        isCurrentlyPlaying;

    if (isCurrentSong) {
      isCurrentlyPlaying = !SongsInMemoryStore.isSongPaused(songId);
    } else {
      isCurrentlyPlaying = false;
    }

    this.setState({
      isCurrentlyPlaying: isCurrentlyPlaying,
    });
  },


  handleFollowingSongButtonClick() {
    console.log("isInQueueTable", this.props.isInQueueTable);
    if(this.props.isFollowed) {
      if ( ViewedSongsStore.songGroupDetails().is_current_user_like_index ) {
        ViewedSongsActions.unlikeSongFromWithinSongLikesPlaylist(this.props.songId);
      } else {
        console.log("UNLIKE SONG REQUESTED");
        ViewedSongsActions.unlikeSong(this.props.songId, this.props.isInQueueTable, this.props.isInRadioTable);
      }
    } else {
      console.log("SONG LIKE REQUESTED");
      ViewedSongsActions.likeSong(this.props.songId, this.props.isInQueueTable, this.props.isInRadioTable);
    };
  },

  followingButtonClasses() {
    if (this.props.isFollowed) {
      return "fa fa-heart";
    } else {
      return "fa fa-heart-o";
    }
  },

  handleMouseEnter() {
    this.setState({
      displayStyle: {
        visibility: "visible"
      }
    });
  },

  handleMouseLeave() {
    this.setState({
      displayStyle: {
        visibility: "hidden"
      }
    });
  },

  handlePlayOrPauseRequest() {
    console.log("play or pause requested");

    let songPosition           = this.props.indexInCurrentSongList - 1,
        isInQueueTable         = this.props.isInQueueTable,
        isInRadioTable         = this.props.isInRadioTable,
        isInSearchResultsTable = this.props.isInSearchResultsTable,

        songId                 = this.props.songId,
        currentlyPlayingSongId = QueuedSongsStore.currentSong().song_id,
        isCurrentSong          = songId === currentlyPlayingSongId;

    if (isCurrentSong) {
      if (this.state.isCurrentlyPlaying) {
        ActionQueueStore.requestToPauseTheCurrentSong();
      } else {
        ActionQueueStore.requestToResumePlayForTheCurrentSong();
      }
    } else {
      ActionQueueStore.requestToPlayNewSongGroup(songPosition, isInQueueTable, isInRadioTable, isInSearchResultsTable);
    }

  },

  handleSpecialDropdown(event) {
    if (this.state.displayStyle.visibility === "visible") {
      let type = ViewedSongsStore.songGroupDetails().type;
      if (type === "Playlist" && ViewedSongsStore.songGroupDetails().id) {
        this.props.openSongMenuModal(event, this.props.songId, ViewedSongsStore.songGroupDetails().id);
      } else {
        this.props.openSongMenuModal(event, this.props.songId, null);
      }

      console.log(this.props);
      console.log(ViewedSongsStore.songGroupDetails());
      console.log("special dropdown requested");
    }
  },


  playOrPauseClasses() {
    if (this.state.isCurrentlyPlaying) {
      return (
        "fa fa-pause fa-stack-1x"
      );
    } else {
      return (
        "fa fa-play fa-stack-1x"
      );
    }
  },



  render() {
    return (
      <tr onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <td >
          <span onClick={ this.handlePlayOrPauseRequest } style={ this.state.displayStyle } className="fa-stack fa-lg">
              <i className="fa fa-circle-thin fa-stack-2x song-display-play-circle"></i>
              <i className={ this.playOrPauseClasses() } ></i>
          </span>
        </td>
        <td>{ this.props.indexInCurrentSongList }</td>
        <td><span onClick={this.handleFollowingSongButtonClick} className={this.followingButtonClasses()} aria-hidden="true"></span></td>
        <td>{ this.props.title }</td>
        <td>
          <Link to={ `artists/${this.props.artistId}` }>{ this.props.artist }</Link>
        </td>
        <td>
          <Link to={ `albums/${this.props.albumId}` }>{ this.props.album }</Link>
        </td>
        <td><i onClick={ this.handleSpecialDropdown } style={ this.state.displayStyle } className="fa fa-plus" aria-hidden="true"></i></td>
        <td>{ this.roundTime(this.props.songDuration) }</td>
        <td>
          <RatingStars
            songId={ this.props.songId }
            starRating={this.props.starRating}
            isInQueueTable={ this.props.isInQueueTable }
            isInRadioTable={ this.props.isInRadioTable }
          />
        </td>
      </tr>
    );
  },

  roundTime(numberOfSeconds) {
    let totalSeconds = Math.floor(numberOfSeconds),
        seconds      = totalSeconds % 60,
        minutes      = (totalSeconds - seconds) / 60;
    if (seconds < 10) {
      seconds = "0" + String(seconds);
    } else {
      seconds = String(seconds);
    }
    return `${String(minutes)}:${seconds}`;
  },



})

module.exports = TableRow;
