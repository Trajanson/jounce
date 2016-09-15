import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants        from './../Constants/Action_Constants.jsx';

const FollowedArtistsStore = new Store(Dispatcher);

let _followedArtists = [];

const recieveUpdatedSetOfFollowedArtists = function (artists) {
  _followedArtists = artists;
};

FollowedArtistsStore.followedArtists = function() {
  return _followedArtists;
};


FollowedArtistsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ActionConstants.STORE_ARTISTS_FOLLOWED_BY_USER_INTO_FOLLOWED_ARTISTS_STORE:
      recieveUpdatedSetOfFollowedArtists(payload.followedArtists);
      this.__emitChange();
      break;
  }
};


module.exports = FollowedArtistsStore;
