import React                        from 'react';

import FeaturedContentStore         from './../../Stores/Featured_Content_Store.jsx';

import FeaturedContentActions       from './../../Actions/Featured_Content_Actions.jsx';

import ArtistShowcase               from './Artist_Showcase.jsx';
import AlbumShowcase                from './Album_Showcase.jsx';


var Explorer = React.createClass({
  getInitialState() {
    return ({
      featuredAnnouncements: "",
      featuredPlaylists: [],
      featuredArtists:   [],
      featuredAlbums:    [],
    });
  },

  componentDidMount() {
    FeaturedContentActions.retrieveFeaturedContent();

    this.featuredContentStoreListener   = FeaturedContentStore.addListener(this.updateStateToReflectFeaturedContentStore);
    this.updateStateToReflectFeaturedContentStore();
  },

  componentWillUnmount () {
    this.featuredContentStoreListener.remove();
  },

  updateStateToReflectFeaturedContentStore() {
    let featuredAnnouncements = FeaturedContentStore.featuredAnnouncements(),
    featuredPlaylists     = FeaturedContentStore.featuredPlaylists(),
    featuredArtists       = FeaturedContentStore.featuredArtists(),
    featuredAlbums        = FeaturedContentStore.featuredAlbums();

    this.setState({
      featuredAnnouncements: featuredAnnouncements,
      featuredPlaylists:     featuredPlaylists,
      featuredArtists:       featuredArtists,
      featuredAlbums:        featuredAlbums,
    });
  },

  featuredArtists() {
    return this.state.featuredArtists.map(function(artist, index) {
      return (
        <ArtistShowcase key={index}
                       artistImagePath={artist.artist_image_path}
                       artistName={artist.artist_name}
                       artistId={artist.artist_id}
        />
      );
    });
  },

  followedAlbums() {
    return this.state.featuredAlbums.map(function(album, index) {
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
  },


  render() {
    return (
      <div id="inner-core-content-container">
      <div className="followed-albums-viewer-title">
        Try These Featured Albums
      </div>
        <div className="followed-albums-list">
          { this.followedAlbums() }
        </div>
        <br/><br/>
        <br/><br/>
        <br/><br/>


        <div className="followed-albums-viewer-title">
          Try These Featured Artists
        </div>
          <div className="followed-albums-list">
            { this.featuredArtists() }
          </div>
      </div>
    );
  }

});

module.exports = Explorer;
