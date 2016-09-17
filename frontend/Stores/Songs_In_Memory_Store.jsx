import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const SongsInMemoryStore = new Store(Dispatcher);



const _songsInMemory = {};

let _queuedSongsStore;

// INITIALIZATION //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
SongsInMemoryStore.setQueuedSongsStore = function(queuedSongsStore) {
  _queuedSongsStore = queuedSongsStore;
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// LOADER SEQUENCE /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
SongsInMemoryStore.handleLoading = function() {
  let upcomingSongs = _queuedSongsStore.upcomingSongs();

  for (var i = 0; i < upcomingSongs.length && i < 5; i += 1) {
    let songInfo = upcomingSongs[i];
    SongsInMemoryStore.ensureSongLoaded(songInfo);
  }
}

SongsInMemoryStore.ensureSongLoaded = function(songInfo) {
  if (!_songsInMemory[songInfo.song_id]) {
    let songTag  = document.createElement("AUDIO");
    songTag.src  = songInfo.path;
    songTag.load();

    _songsInMemory[songInfo.song_id] = songTag;
  }
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




SongsInMemoryStore.startPlayForSongNumber = function(songNumber) {
  _songsInMemory[songNumber].pause();
  _songsInMemory[songNumber].currentTime = 0;
  _songsInMemory[songNumber].play();
};

SongsInMemoryStore.resetSongNumber = function(songNumber) {
  _songsInMemory[songNumber].pause();
  if (_songsInMemory[songNumber].currentTime !== 0) {
    _songsInMemory[songNumber].currentTime = 0;
  }
};

SongsInMemoryStore.seekToPositionForSongNumber = function(position, songNumber) {
  _songsInMemory[songNumber].pause();
  _songsInMemory[songNumber].currentTime = position;
};





SongsInMemoryStore.isSongLoaded = function(songNumber) {
  return (
    _songsInMemory[songNumber] && _songsInMemory[songNumber].readyState === 4
  )
};

SongsInMemoryStore.isSongNotSeeking = function(songNumber) {
  return (
    _songsInMemory[songNumber] && !_songsInMemory[songNumber].seeking
  )
};

SongsInMemoryStore.isSongPaused = function(songNumber) {
  return (
    _songsInMemory[songNumber] && _songsInMemory[songNumber].paused
  )
};


SongsInMemoryStore.currentTimeForSongNumber = function(songNumber) {
  return (
    _songsInMemory[songNumber].currentTime
  );
};

SongsInMemoryStore.durationForSongNumber = function(songNumber) {
  return (
    _songsInMemory[songNumber].duration
  );
};

SongsInMemoryStore.hasPlayFinishedForSongNumber = function(songNumber) {
  return (
    _songsInMemory[songNumber].ended
  );
};


SongsInMemoryStore.pauseSongNumber = function(songNumber) {
  _songsInMemory[songNumber].pause();
};

SongsInMemoryStore.playSongNumber = function(songNumber) {
  _songsInMemory[songNumber].play();
};



SongsInMemoryStore.__onDispatch = function(payload) {
  switch (payload.actionType) {

    // FORCE UPDATE
    case ActionConstants.ASYNC_FORCE_SONGS_IN_MEMORY_UPDATE:
      this.__emitChange();
      break;
  }
};


module.exports = SongsInMemoryStore;
