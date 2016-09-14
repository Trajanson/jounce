import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const FollowedPlaylistsStore = new Store(Dispatcher);

const _followedPlaylists = window.playlistNamesOnLoad.slice(0);

const addPlaylist = function(newPlaylist) {
  _followedPlaylists.push(newPlaylist);
};


FollowedPlaylistsStore.followedPlaylists = function() {
  return _followedPlaylists;
};


FollowedPlaylistsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ActionConstants.STORE_PLAYLISTS_FOLLOWED_BY_USER_INTO_STORE:
      addPlaylist(payload.newPlaylist);
      this.__emitChange();
      break;
  }
};


module.exports = FollowedPlaylistsStore;
