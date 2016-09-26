import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants     from './../Constants/Action_Constants.jsx';
import FunctionalUtilities from './../Utilities/Functional_Utilities.jsx';

const FeaturedContentStore = new Store(Dispatcher);

let _featuredAnnouncements = "";
let _featuredPlaylists     = [];
let _featuredArtists       = [];
let _featuredAlbums        = [];


let importFeaturedContent = function(featuredContent) {
  _featuredAnnouncements = featuredContent.announcements;
  _featuredPlaylists     = featuredContent.playlists;
  _featuredArtists       = featuredContent.artists;
  _featuredAlbums        = featuredContent.albums;
};

FeaturedContentStore.featuredAnnouncements = function() {
  return _featuredAnnouncements;
};

FeaturedContentStore.featuredPlaylists = function() {
  return _featuredPlaylists;
};

FeaturedContentStore.featuredArtists = function() {
  return _featuredArtists;
};

FeaturedContentStore.featuredAlbums = function() {
  return _featuredAlbums;
};


FeaturedContentStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ActionConstants.STORE_FEATURED_CONTENT_IN_FEATURED_CONTENT_STORE:
      importFeaturedContent(payload.featuredContent);
      this.__emitChange();
      break;
  }
};


module.exports = FeaturedContentStore;
