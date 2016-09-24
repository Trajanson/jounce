import ActionConstants    from './../Constants/Action_Constants.jsx';
import APIHandler         from './../Utilities/API_Handler.jsx';
import Dispatcher         from './../Dispatcher/Dispatcher.jsx';

const hashHistory = require('react-router').hashHistory;


module.exports = {
  submitSearchRequest(searchBox) {

    APIHandler.fetchSearchResults(this.notifySearchResultsStoreOfSearchResults, searchBox);

  },



  notifySearchResultsStoreOfSearchResults(searchResults, searchBox) {
    Dispatcher.dispatch({
      actionType: ActionConstants.RECIEVE_SEARCH_RESULTS,
      users:         searchResults.users,
      albums:        searchResults.albums,
      artists:       searchResults.artists,
      playlists:     searchResults.playlists,
      songs_info:    searchResults.songs_info_and_songs.songs_info,
      songs:         searchResults.songs_info_and_songs.songs,
    });

    searchBox.value = "";
    hashHistory.push('/search_results');
  },

};
