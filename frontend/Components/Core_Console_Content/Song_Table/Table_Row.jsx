"require strict";

import React                    from 'react';
import { Link }                 from 'react-router';

import RatingStars              from './Rating_Stars.jsx'

import ViewedSongsActions       from './../../../Actions/Viewed_Songs_Actions.jsx';
import ViewedSongsStore         from './../../../Stores/Viewed_Songs_Store.jsx';


var TableRow = React.createClass({
  getInitialState() {
    return ({
      displayStyle: {
        visibility:         "hidden",
        isCurrentlyPlaying: false,
      }
    });
  },

  componentDidMount() {
    this.viewedSongsStoreListener   = ViewedSongsStore.addListener(this.updateStateFromSongsInMemoryStore);
  },

  componentWillUnmount() {
    this.viewedSongsStoreListener.remove();
  },


  handleFollowingSongButtonClick() {
    if(this.props.isFollowed) {
      if ( ViewedSongsStore.songGroupDetails().is_current_user_like_index ) {
        ViewedSongsActions.unlikeSongFromWithinSongLikesPlaylist(this.props.songId);
      } else {
        ViewedSongsActions.unlikeSong(this.props.songId);
      }
    } else {
      ViewedSongsActions.likeSong(this.props.songId);
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
    return (
      "fa fa-play fa-stack-1x"
    );
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
        <td><RatingStars songId={ this.props.songId } starRating={this.props.starRating} /></td>
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
