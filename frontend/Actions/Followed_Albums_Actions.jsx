"require strict";

import ActionConstants    from './../Constants/Action_Constants.jsx';
import APIHandler         from './../Utilities/API_Handler.jsx';
import Dispatcher         from './../Dispatcher/Dispatcher.jsx';


module.exports = {

  retrieveFollowedAlbums() {
    APIHandler.retrieveFollowedAlbums(this.informFollowedAlbumsStoreOfUpdatedFollowedAlbums)

  },

  informFollowedAlbumsStoreOfUpdatedFollowedAlbums(followedAlbums) {
    Dispatcher.dispatch({
      actionType: ActionConstants.STORE_ALBUMS_FOLLOWED_BY_USER_INTO_FOLLOWED_ALBUMS_STORE,
      followedAlbums:      followedAlbums,
    });

  },

};
