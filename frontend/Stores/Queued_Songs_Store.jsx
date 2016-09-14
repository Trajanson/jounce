import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const QueuedSongsStore             = new Store(Dispatcher);

let _groupOfSongsInQueue           = window.initialSongsToLoadForRadio.slice(0);

let _queuedSongGroupDetails        = Object.assign({}, window.informationOnGroupOfInitialSongsToLoadForRadio);

let _upcomingSongs                 = _groupOfSongsInQueue.slice(0);

let _currentIndexWithinQueuedSongs = 0;

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

}


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
};

QueuedSongsStore.moveToPrevious = function() {
  console.log("_groupOfSongsInQueue", _groupOfSongsInQueue);
  rollCurrentIndexToPreviousWithinQueuedSongs();


  let previousSong = _groupOfSongsInQueue[_currentIndexWithinQueuedSongs];
  console.log("_currentIndexWithinQueuedSongs", _currentIndexWithinQueuedSongs);
  console.log("previousSong", previousSong);

  _upcomingSongs.unshift(previousSong);
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
  }

};

module.exports = QueuedSongsStore;
