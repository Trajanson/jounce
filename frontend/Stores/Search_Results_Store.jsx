import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants     from './../Constants/Action_Constants.jsx';
import FunctionalUtilities from './../Utilities/Functional_Utilities.jsx';

const SearchResultsStore = new Store(Dispatcher);

let _userMatches     = [];
let _albumMatches    = [];
let _artistMatches   = [];
let _playlistMatches = [];

let _songMatchesInfo = {};

let _songMatches     = [];



let recieveSearchResults = function(users, albums, artists, playlists, songsInfo, songs) {
  _userMatches     = users;
  _albumMatches    = albums;
  _artistMatches   = artists;
  _playlistMatches = playlists;

  _songMatchesInfo = songsInfo;

  _songMatches     = songs;

}




SearchResultsStore.matchedUsers = function() {
  return _userMatches;
};

SearchResultsStore.matchedAlbums = function() {
  return _albumMatches;
};

SearchResultsStore.matchedArtists = function() {
  return _artistMatches;
};

SearchResultsStore.matchedPlaylists = function() {
  return _playlistMatches;
};

SearchResultsStore.matchedSongsInfo = function() {
  return _songMatchesInfo;
};

SearchResultsStore.matchedSongs = function() {
  return _songMatches;
};















SearchResultsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ActionConstants.RECIEVE_SEARCH_RESULTS:
    console.log(payload);
      recieveSearchResults(
        payload.users,
        payload.albums,
        payload.artists,
        payload.playlists,
        payload.songs_info,
        payload.songs
      );
      this.__emitChange();
      break;

  }
};


module.exports = SearchResultsStore;
