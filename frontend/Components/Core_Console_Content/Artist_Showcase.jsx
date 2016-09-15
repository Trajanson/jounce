"require strict";

import React                         from 'react';
import FollowedAlbumsStore           from './../../Stores/Followed_Albums_Store.jsx';
import FollowedAlbumsActions         from './../../Actions/Followed_Albums_Actions.jsx';

import { Link, hashHistory }         from 'react-router';


var ArtistShowcase = React.createClass({

  handleImageClick(event) {
    event.stopPropagation();
    event.preventDefault();
    hashHistory.push(`artists/${this.props.artistId}`);
  },

  render() {
    return (
      <div className="album-show-case">

        <img onClick={this.handleImageClick} className="album-show-case-image" src={this.props.artistImagePath}></img>

        <div className="album-show-case-text">
          <div className="album-show-case-title" >
            <Link to={ `albums/${this.props.artistId}` }>{ this.props.artistName }</Link>
          </div>

        </div>


      </div>
    );
  },

});

module.exports = ArtistShowcase;
