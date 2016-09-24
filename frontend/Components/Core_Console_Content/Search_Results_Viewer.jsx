import React                    from 'react';

import SearchResultsStore       from './../../Stores/Search_Results_Store.jsx';

import SongTable                from './Song_Table/Song_Table.jsx'


var SearchResultsViewer = React.createClass({
  componentDidMount() {
    this.updateStateToReflectSearchResultsStore();
    this.searchResultsStoreListener   = SearchResultsStore.addListener(this.updateStateToReflectSearchResultsStore);
  },

  componentWillUnmount () {
    this.searchResultsStoreListener.remove();
  },

  updateStateToReflectSearchResultsStore() {
    let users     = SearchResultsStore.matchedUsers(),
        albums    = SearchResultsStore.matchedAlbums(),
        artists   = SearchResultsStore.matchedArtists(),
        playlists = SearchResultsStore.matchedPlaylists(),
        songsInfo = SearchResultsStore.matchedSongsInfo(),
        songs     = SearchResultsStore.matchedSongs();
    this.setState({
      users:     users,
      albums:    albums,
      artists:   artists,
      playlists: playlists,
      songsInfo: songsInfo,
      songs:     songs,
    });

  },


  getInitialState() {
    let users     = SearchResultsStore.matchedUsers(),
        albums    = SearchResultsStore.matchedAlbums(),
        artists   = SearchResultsStore.matchedArtists(),
        playlists = SearchResultsStore.matchedPlaylists(),
        songsInfo = SearchResultsStore.matchedSongsInfo(),
        songs     = SearchResultsStore.matchedSongs();
    return({
      users:     users,
      albums:    albums,
      artists:   artists,
      playlists: playlists,
      songsInfo: songsInfo,
      songs:     songs,
    });
  },

  render: function() {
    return (
      <div id="core-content">
        Search Results Viewer
        <SongTable songs={this.state.songs}
                   openSongMenuModal={ this.props.openSongMenuModal }
                   isInQueueTable={ false }
                   isInRadioTable={ false }
                   isInSearchResultsTable={    true }
        />

      </div>
    );
  }

});

module.exports = SearchResultsViewer;
