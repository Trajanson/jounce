import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants        from './../Constants/Action_Constants.jsx';

const FollowedAlbumsStore = new Store(Dispatcher);

let _followedAlbums = [];

const recieveUpdatedSetOfFollowedAlbums = function (albums) {
  _followedAlbums = albums;
};

FollowedAlbumsStore.followedAlbums = function() {
  return _followedAlbums;
};


FollowedAlbumsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ActionConstants.STORE_ALBUMS_FOLLOWED_BY_USER_INTO_FOLLOWED_ALBUMS_STORE:
      recieveUpdatedSetOfFollowedAlbums(payload.followedAlbums);
      this.__emitChange();
      break;
  }
};


module.exports = FollowedAlbumsStore;
