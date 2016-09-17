import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const UpcomingRadioSongsStore = new Store(Dispatcher);

let _upcomingRadioSongs = window.initialSongsToLoadForRadio.slice(0);

let _radioSongGroupDetails = Object.assign({}, window.informationOnGroupOfInitialSongsToLoadForRadio);



const addLikesFor = function (songLike) {
  _upcomingRadioSongs.forEach(function(viewedSong) {
    if (songLike.song_id === viewedSong.song_id) {
      viewedSong.is_followed = true;
    }
  });
};

const removeLikesFor = function (songUnlike) {
  _upcomingRadioSongs.forEach(function(viewedSong) {
    if (songUnlike.song_id === viewedSong.song_id) {
      viewedSong.is_followed = false;
    }
  });
};

const updateSongLikes = function(songRating) {
  _upcomingRadioSongs.forEach(function(viewedSong) {
    if (songRating.song_id === viewedSong.song_id) {
      viewedSong.star_rating = songRating.rating;
    }
  });
};


UpcomingRadioSongsStore.setUpcomingRadioSongsTo = function(songs) {
  _upcomingRadioSongs = songs;
};

UpcomingRadioSongsStore.upcomingRadioSongs = function() {
  return _upcomingRadioSongs;
};

UpcomingRadioSongsStore.radioSongGroupDetails = function() {
  return _radioSongGroupDetails;
};






UpcomingRadioSongsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    // SONG LIKES
    case ActionConstants.NOTIFY_RADIO_SONG_STORE_OF_NEW_SONG_LIKE:
      addLikesFor(payload.songLike);
      this.__emitChange();
      break;
    case ActionConstants.NOTIFY_RADIO_SONG_STORE_OF_REMOVED_SONG_LIKE:
      removeLikesFor(payload.songUnlike);
      this.__emitChange();
      break;

    // SONG RATINGS
    case ActionConstants.NOTIFY_RADIO_SONG_STORE_OF_NEW_SONG_RATING:
      updateSongLikes(payload.songRating);
      this.__emitChange();
      break;

  }
};


module.exports = UpcomingRadioSongsStore;
