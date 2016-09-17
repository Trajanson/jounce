import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const QueuedSongsStore             = new Store(Dispatcher);

let _upcomingRadioSongsStore;

let _groupOfSongsInQueue           = window.initialSongsToLoadForRadio.slice(0);

let _queuedSongGroupDetails        = Object.assign({}, window.informationOnGroupOfInitialSongsToLoadForRadio);

let _upcomingSongs                 = _groupOfSongsInQueue.slice(0);

let _currentIndexWithinQueuedSongs = 0;

QueuedSongsStore.setUpcomingRadioSongsStore = function(upcomingRadioSongsStore) {
  _upcomingRadioSongsStore = upcomingRadioSongsStore;
};



let resetUpcomingSongs                         = function() {
  _upcomingSongs = _groupOfSongsInQueue.slice(_currentIndexWithinQueuedSongs);
};

let rollCurrentIndexForwardWithinQueuedSongs   = function() {
  _currentIndexWithinQueuedSongs += 1;
  if (_currentIndexWithinQueuedSongs > _groupOfSongsInQueue.length) {
    _currentIndexWithinQueuedSongs = 0;
  }
};

let rollCurrentIndexToPreviousWithinQueuedSongs = function() {
  _currentIndexWithinQueuedSongs -= 1;
  if (_currentIndexWithinQueuedSongs < 0 ) {
    _currentIndexWithinQueuedSongs = 0;
  }

};


const addLikesFor = function (songLike) {
  _upcomingSongs.forEach(function(viewedSong) {
    if (songLike.song_id === viewedSong.song_id) {
      viewedSong.is_followed = true;
    }
  });
  _groupOfSongsInQueue.forEach(function(viewedSong) {
    if (songLike.song_id === viewedSong.song_id) {
      viewedSong.is_followed = true;
    }
  });
};

const removeLikesFor = function (songUnlike) {
  _upcomingSongs.forEach(function(viewedSong) {
    if (songUnlike.song_id === viewedSong.song_id) {
      viewedSong.is_followed = false;
    }
  });
  _groupOfSongsInQueue.forEach(function(viewedSong) {
    if (songUnlike.song_id === viewedSong.song_id) {
      viewedSong.is_followed = false;
    }
  });
};


const updateSongLikes = function(songRating) {
  _upcomingSongs.forEach(function(viewedSong) {
    if (songRating.song_id === viewedSong.song_id) {
      viewedSong.star_rating = songRating.rating;
    }
  });
  _groupOfSongsInQueue.forEach(function(viewedSong) {
    if (songRating.song_id === viewedSong.song_id) {
      viewedSong.star_rating = songRating.rating;
    }
  });

};



QueuedSongsStore.upcomingSongs                 = function() {
  return _upcomingSongs;
};

QueuedSongsStore.songGroupDetails              = function() {
  return _queuedSongGroupDetails;
};

QueuedSongsStore.currentIndexWithinQueuedSongs = function() {
  return _currentIndexWithinQueuedSongs;
};


QueuedSongsStore.currentSong = function() {
  return (_upcomingSongs[0]);
};

QueuedSongsStore.moveForward = function(numberOfForwardSkipsArgument) {
  let numberOfForwardSkipsToComplete = numberOfForwardSkipsArgument || 1,
      numberOfCompletedSkips         = 0;

  while (numberOfCompletedSkips < numberOfForwardSkipsToComplete) {
    rollCurrentIndexForwardWithinQueuedSongs();
    _upcomingSongs.shift();
    numberOfCompletedSkips += 1;
  }
  if( _queuedSongGroupDetails.type === "Radio" ) {
    _upcomingRadioSongsStore.setUpcomingRadioSongsTo(_upcomingSongs);
  }
};

QueuedSongsStore.moveToPrevious = function() {
  console.log("_groupOfSongsInQueue", _groupOfSongsInQueue);
  rollCurrentIndexToPreviousWithinQueuedSongs();


  let previousSong = _groupOfSongsInQueue[_currentIndexWithinQueuedSongs];
  console.log("_currentIndexWithinQueuedSongs", _currentIndexWithinQueuedSongs);
  console.log("previousSong", previousSong);

  _upcomingSongs.unshift(previousSong);

  if( _queuedSongGroupDetails.type === "Radio" ) {
    _upcomingRadioSongsStore.setUpcomingRadioSongsTo(_upcomingSongs);
  }
};




QueuedSongsStore.resetQueuedSongsWithNewSongsFromViewedSongStore = function(newSongsToQueue, newSongsToQueueDetails, currentIndexInSongList) {
  _groupOfSongsInQueue                   = newSongsToQueue;
  _queuedSongGroupDetails        = newSongsToQueueDetails;
  _currentIndexWithinQueuedSongs = currentIndexInSongList;
  resetUpcomingSongs();
}


let addSongsFromRadio = function(songs) {
  songs.forEach(function(song) {
    _upcomingSongs.push(song);
  });
};




QueuedSongsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ActionConstants.RESET_QUEUED_SONGS_WITH_NEW_SONGS_FROM_VIEWED_SONG_STORE:
      this.__emitChange();
      break;
    case ActionConstants.RESET_QUEUED_SONGS_WITH_NEW_SONGS_FROM_RADIO_API:
      this.resetQueuedSongsWithNewSongsFromViewedSongStore(
        payload.newSongsToQueue,
        payload.newSongsToQueueDetails,
        0
      );
      this.__emitChange();
      break;


    case ActionConstants.NOTIFY_QUEUED_SONG_STORE_OF_NEW_SONG_LIKE:
    console.log("NOTIFY_QUEUED_SONG_STORE_OF_NEW_SONG_LIKE");
      addLikesFor(payload.songLike);
      this.__emitChange();
      break;
    case ActionConstants.NOTIFY_QUEUED_SONG_STORE_OF_REMOVED_SONG_LIKE:
      console.log("NOTIFY_QUEUED_SONG_STORE_OF_REMOVED_SONG_LIKE");
      removeLikesFor(payload.songUnlike);
      this.__emitChange();
      break;

    // SONG RATINGS
    case ActionConstants.NOTIFY_QUEUED_SONG_STORE_OF_NEW_SONG_RATING:
      updateSongLikes(payload.songRating);
      this.__emitChange();
      break;


    // FORCE UPDATE
    case ActionConstants.ASYNC_FORCE_UPCOMING_RADIO_SONGS_STORE_UPDATE:
      this.__emitChange();
      break;
  }

};

module.exports = QueuedSongsStore;
