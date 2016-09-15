"require strict";

import ActionConstants    from './../Constants/Action_Constants.jsx';
import APIHandler         from './../Utilities/API_Handler.jsx';
import Dispatcher         from './../Dispatcher/Dispatcher.jsx';


module.exports = {

  retrieveFollowedArtists() {
    APIHandler.retrieveFollowedArtists(this.informFollowedArtistsStoreOfUpdatedFollowedArtists)

  },

  informFollowedArtistsStoreOfUpdatedFollowedArtists(followedArtists) {
    Dispatcher.dispatch({
      actionType:      ActionConstants.STORE_ARTISTS_FOLLOWED_BY_USER_INTO_FOLLOWED_ARTISTS_STORE,
      followedArtists: followedArtists,
    });

  },

};
