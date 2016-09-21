import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';
import Modes                 from './../Constants/Modes.jsx';

const QueuedSongsStore             = new Store(Dispatcher);

let _upcomingRadioSongsStore;

let _groupOfSongsInQueue           = window.initialSongsToLoadForRadio.slice(0);

let _queuedSongGroupDetails        = Object.assign({}, window.informationOnGroupOfInitialSongsToLoadForRadio);

let _upcomingSongs                 = _groupOfSongsInQueue.slice(0);

let _currentIndexWithinQueuedSongs = 0;

let _shuffleUpcomingSongsMode = false;

let _loopMode = Modes.NO_LOOP_MODE;

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


QueuedSongsStore.isInnShuffleMode                 = function() {
  return _shuffleUpcomingSongsMode;
};

QueuedSongsStore.loopMode                 = function() {
  return _loopMode;
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









QueuedSongsStore.toggleShuffleMode = function() {
  _shuffleUpcomingSongsMode = !_shuffleUpcomingSongsMode;
  console.log("_shuffleUpcomingSongsMode", _shuffleUpcomingSongsMode);

  if ( _shuffleUpcomingSongsMode ) {
    shuffleUpcomingSongs();
  } else {
    unshuffleUpcomingSongs();
  }

  forceQueuedSongsStoreUpdate();
};


let unshuffleUpcomingSongs = function() {
  let currentSong = _upcomingSongs[0];

  _upcomingSongs = _groupOfSongsInQueue.slice(0);


  while (_upcomingSongs.length !== 0 && _upcomingSongs[0].song_id !== currentSong.song_id) {
    _upcomingSongs.shift();
  }
};

let shuffleUpcomingSongs = function() {
  let currentSong = _upcomingSongs.shift();
    _upcomingSongs = shuffleArray(_upcomingSongs);
    _upcomingSongs.unshift(currentSong);
};


let shuffleArray = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};














QueuedSongsStore.toggleLoopModes = function() {
  if (_loopMode        === Modes.NO_LOOP_MODE) {
    _loopMode = Modes.LOOP_PLAYLIST_MODE;
  } else if (_loopMode === Modes.LOOP_PLAYLIST_MODE) {
    _loopMode = Modes.LOOP_SONG_MODE;
  } else if (_loopMode === Modes.LOOP_SONG_MODE) {
    _loopMode = Modes.NO_LOOP_MODE;
  }
  forceQueuedSongsStoreUpdate();
};





QueuedSongsStore.moveForward = function(numberOfForwardSkipsArgument) {
  let numberOfForwardSkipsToComplete = numberOfForwardSkipsArgument || 1,
      numberOfCompletedSkips         = 0;

  while (numberOfCompletedSkips < numberOfForwardSkipsToComplete) {
    rollCurrentIndexForwardWithinQueuedSongs();
    _upcomingSongs.shift();
    numberOfCompletedSkips += 1;
  }

  if ( _loopMode === Modes.LOOP_PLAYLIST_MODE ) {
    _upcomingSongs = _groupOfSongsInQueue.slice(0);
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




QueuedSongsStore.resetQueuedSongsWithNewSongGroup = function(newSongsToQueue, newSongsToQueueDetails, currentIndexInSongList) {
  _groupOfSongsInQueue           = newSongsToQueue;
  _queuedSongGroupDetails        = newSongsToQueueDetails;
  _currentIndexWithinQueuedSongs = currentIndexInSongList;
  resetUpcomingSongs();

  if( _queuedSongGroupDetails.type === "Radio" ) {
    _upcomingRadioSongsStore.setUpcomingRadioSongsTo(_upcomingSongs);
  };
}


let addSongsFromRadio = function(songs) {
  songs.forEach(function(song) {
    _upcomingSongs.push(song);
  });
};




const forceQueuedSongsStoreUpdate = function() {
  Dispatcher.dispatch({
    actionType: ActionConstants.ASYNC_FORCE_QUEUED_SONGS_STORE_UPDATE
  });
};



QueuedSongsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ActionConstants.RESET_QUEUED_SONGS_WITH_NEW_SONGS_FROM_VIEWED_SONG_STORE:
      this.__emitChange();
      break;
    case ActionConstants.RESET_QUEUED_SONGS_WITH_NEW_SONGS_FROM_RADIO_API:
      this.resetQueuedSongsWithNewSongGroup(
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
    case ActionConstants.ASYNC_FORCE_QUEUED_SONGS_STORE_UPDATE:
      this.__emitChange();
      break;
  }

};

module.exports = QueuedSongsStore;
