import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const ActionQueueStore = new Store(Dispatcher);


var _pauseCurrentSongRequested = false;
var _playCurrentSongRequested  = false;

const _trackChangeActions = [];


var _seekToLocationInSongRequest = {
  requested: false,
  requestedPosition: null,
};


// GETTERS /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

ActionQueueStore.noRequestsAreInQueue = function() {
  return(
    !_pauseCurrentSongRequested &&
    !_playCurrentSongRequested  &&
    !_seekToLocationInSongRequest.requested &&
    _trackChangeActions.length === 0
  );
};





ActionQueueStore.hasThereBeenARequestToPauseTheCurrentSong = function() {
  return (
    _pauseCurrentSongRequested
  );
};

ActionQueueStore.hasThereBeenARequestToResumePlayForTheCurrentSong = function() {
  return (
    _playCurrentSongRequested
  );
};

ActionQueueStore.hasThereBeenARequestToSeekToALocationInTheSong = function() {
  return (
    _seekToLocationInSongRequest.requested
  );
};

ActionQueueStore.requestedLocationWithinSongToSeekTo = function() {
  return (
    _seekToLocationInSongRequest.requestedPosition
  );
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////






// SETTERS /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// ADD REQUEST /////////////////////////////////////////////////////////////////

ActionQueueStore.requestToPauseTheCurrentSong = function() {
  _pauseCurrentSongRequested = true;
};

ActionQueueStore.requestToResumePlayForTheCurrentSong = function() {
  _playCurrentSongRequested  = true;
};

ActionQueueStore.requestToSeekToALocationInTheSong = function(location) {
  _seekToLocationInSongRequest.requested  = true;
  _seekToLocationInSongRequest.requestedPosition  = location;
};




// REMOVE REQUEST //////////////////////////////////////////////////////////////

ActionQueueStore.removeRequestToPauseTheCurrentSong = function() {
  _pauseCurrentSongRequested = false;
};

ActionQueueStore.removeRequestToResumePlayForTheCurrentSong = function() {
  _playCurrentSongRequested  = false;
};

ActionQueueStore.removeRequestToSeekToALocationInTheSong = function() {
  _seekToLocationInSongRequest.requested  = false;
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




ActionQueueStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  }
};


module.exports = ActionQueueStore;
