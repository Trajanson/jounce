"require strict";

import React                          from 'react';

import FollowedArtistsStore           from './../../Stores/Followed_Artists_Store.jsx';
import FollowedArtistsActions         from './../../Actions/Followed_Artists_Actions.jsx';

import ArtistShowcase                 from './Artist_Showcase.jsx';


var FollowedArtistsViewer = React.createClass({

  getInitialState() {
    return {
      followedArtists: [],
    };
  },

  componentDidMount() {
    this.followedArtistsListener = FollowedArtistsStore.addListener(this.updateStateToReflectChangeInFollowedArtistsStore);
    FollowedArtistsActions.retrieveFollowedArtists();
  },

  componentWillUnmount() {
    this.followedArtistsListener.remove();
  },

  updateStateToReflectChangeInFollowedArtistsStore() {
    let artists = FollowedArtistsStore.followedArtists();
    this.setState({
      followedArtists: artists,
    });
  },

  render() {
    let followedArtists = this.state.followedArtists.map(function(artist, index) {
      return (
        <ArtistShowcase key={index}
                       artistImagePath={artist.artist_image_path}
                       artistName={artist.artist_name}
                       artistId={artist.artist_id}
        />
      );
    });

    return (
      <div id="inner-core-content-container">
        <div className="followed-albums-viewer-title">
          {`${window.currentUser.username}'s`} Favorite Artists
        </div>
          <div className="followed-albums-list">
            { followedArtists }
          </div>
      </div>
    );
  },

});

module.exports = FollowedArtistsViewer;
