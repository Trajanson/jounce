"require strict";

import React                         from 'react';
import FollowedAlbumsStore           from './../../Stores/Followed_Albums_Store.jsx';
import FollowedAlbumsActions         from './../../Actions/Followed_Albums_Actions.jsx';

import { Link, hashHistory }               from 'react-router';
// const hashHistory = require('react-router').hashHistory;


var AlbumShowcase = React.createClass({

  handleImageClick(event) {
    event.stopPropagation();
    event.preventDefault();
    hashHistory.push(`albums/${this.props.albumId}`);
  },

  render() {
    return (
      <div className="album-show-case">

        <img onClick={this.handleImageClick} className="album-show-case-image" src={this.props.albumCoverPath}></img>

        <div className="album-show-case-text">
          <div className="album-show-case-title" >
            <Link to={ `albums/${this.props.albumId}` }>{ this.props.albumTitle }</Link>
          </div>

          <div className="album-show-case-artist-name" >
            <Link to={ `artists/${this.props.artistId}` }>{ this.props.albumArtistName }</Link>
          </div>
        </div>


      </div>
    );
  },

});

module.exports = AlbumShowcase;
