import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const ActionQueueStore = new Store(Dispatcher);


var _pauseCurrentSongRequested = false;
var _playCurrentSongRequested  = false;

var _nextSongRequested         = false;
var _previousSongRequested     = false;

var _seekToLocationInSongRequest = {
  requested: false,
  requestedPosition: null,
};

var _playNewSongGroupRequest = {
  requested: false,
  positionRequested: null,
  requestComesFromQueueTable: false,
  requestComesFromRadioTable: false,
  requestComesFromSearchResultsTable: false,
}

ActionQueueStore.resetQueue = function() {
  _pauseCurrentSongRequested             = false;
  _playCurrentSongRequested              = false;
  _nextSongRequested                     = false;
  _previousSongRequested                 = false;
  _seekToLocationInSongRequest.requested = false;
  _playNewSongGroupRequest.requested     = false;
};

// GETTERS /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

ActionQueueStore.noRequestsAreInQueue = function() {
  return(
    !_playNewSongGroupRequest.requested &&

    !_pauseCurrentSongRequested &&
    !_playCurrentSongRequested  &&
    !_seekToLocationInSongRequest.requested &&
    !_nextSongRequested &&
    !_previousSongRequested
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

ActionQueueStore.hasThereBeenARequestToMoveToTheNextSong = function() {
  return (
    _nextSongRequested
  );
};

ActionQueueStore.hasThereBeenARequestToMoveToThePreviousSong = function() {
  return (
    _previousSongRequested
  );
};


ActionQueueStore.hasThereBeenARequestToPlayANewSongGroup = function() {
  return (
    _playNewSongGroupRequest.requested
  );
};

ActionQueueStore.requestedPositionWithinSongGroup = function() {
  return (
    _playNewSongGroupRequest.positionRequested
  );
};

ActionQueueStore.doesRequestToPlayNewSongGroupComeFromAQueueTable = function() {
  return (
    _playNewSongGroupRequest.requestComesFromQueueTable
  );
};

ActionQueueStore.doesRequestToPlayNewSongGroupComeFromARadioTable = function() {
  return (
    _playNewSongGroupRequest.requestComesFromRadioTable
  );
};
ActionQueueStore.doesRequestToPlayNewSongGroupComeFromASearchResultsTable = function() {
  return (
    _playNewSongGroupRequest.requestComesFromSearchResultsTable
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

ActionQueueStore.requestToMoveToTheNextSong = function() {
  _nextSongRequested      = true;
};

ActionQueueStore.requestToMoveToThePreviousSong = function() {
  _previousSongRequested  = true;
};

ActionQueueStore.requestToSeekToALocationInTheSong = function(location) {
  _seekToLocationInSongRequest.requested  = true;
  _seekToLocationInSongRequest.requestedPosition  = location;
};


ActionQueueStore.requestToPlayNewSongGroup = function(positionRequested, requestComesFromQueueTable, requestComesFromRadioTable, requestComesFromSearchResultsTable) {
  _playNewSongGroupRequest.requested                   = true;
  _playNewSongGroupRequest.positionRequested           = positionRequested;
  _playNewSongGroupRequest.requestComesFromQueueTable  = requestComesFromQueueTable;
  _playNewSongGroupRequest.requestComesFromRadioTable  = requestComesFromRadioTable;
  _playNewSongGroupRequest.requestComesFromSearchResultsTable  = requestComesFromSearchResultsTable;
};




// REMOVE REQUEST //////////////////////////////////////////////////////////////

ActionQueueStore.removeRequestToPauseTheCurrentSong = function() {
  _pauseCurrentSongRequested = false;
};

ActionQueueStore.removeRequestToResumePlayForTheCurrentSong = function() {
  _playCurrentSongRequested  = false;
};

ActionQueueStore.removeRequestToMoveToTheNextSong = function() {
  _nextSongRequested  = false;
};

ActionQueueStore.removeRequestToMoveToThePreviousSong = function() {
  _previousSongRequested  = false;
};

ActionQueueStore.removeRequestToSeekToALocationInTheSong = function() {
  _seekToLocationInSongRequest.requested  = false;
};


ActionQueueStore.removeRequestToPlayNewSongGroup = function() {
  _playNewSongGroupRequest.requested  = false;
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




ActionQueueStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  }
};


module.exports = ActionQueueStore;
