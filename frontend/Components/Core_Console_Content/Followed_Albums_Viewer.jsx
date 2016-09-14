"require strict";

import React                         from 'react';
import FollowedAlbumsStore           from './../../Stores/Followed_Albums_Store.jsx';
import FollowedAlbumsActions         from './../../Actions/Followed_Albums_Actions.jsx';

import AlbumShowcase                 from './Album_Showcase.jsx';

var FollowedAlbumsViewer = React.createClass({
  getInitialState () {
    return {
      followedAlbums: [],
    };
  },

  componentDidMount () {
    this.followedAlbumsListener = FollowedAlbumsStore.addListener(this.updateStateToReflectChangeInFollowedAlbumsStore);
    FollowedAlbumsActions.retrieveFollowedAlbums();
  },

  componentWillUnmount () {
    this.followedAlbumsListener.remove();
  },

  updateStateToReflectChangeInFollowedAlbumsStore() {
    let albums = FollowedAlbumsStore.followedAlbums();
    this.setState({
      followedAlbums: albums,
    });
  },

  onAlbumShowcaseMouseEnter() {
    style: "box-shadow: 5px 6px 5px #ff9f9f;"
  },

  render() {
    let followedAlbums = this.state.followedAlbums.map(function(album, index) {
      return (
        <AlbumShowcase key={index}
                       albumCoverPath={album.album_cover_path}
                       albumTitle={album.album_title}
                       albumId={album.album_id}
                       albumArtistName={album.artist_name}
                       artistId={album.artist_id}
        />
      );
    });

    return (
      <div id="inner-core-content-container">
        <div className="followed-albums-viewer-title">
          {`${window.currentUser.username}'s`} Favorite Albums
        </div>
          <div className="followed-albums-list">
            { followedAlbums }
          </div>
      </div>
    );
  },

});

module.exports = FollowedAlbumsViewer;
