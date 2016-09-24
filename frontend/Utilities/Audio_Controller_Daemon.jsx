import Settings                    from './../Constants/Settings.jsx';
import ActionConstants             from './../Constants/Action_Constants.jsx';
import Modes                       from './../Constants/Modes.jsx';

import Dispatcher                  from './../Dispatcher/Dispatcher.jsx';

import SongsInMemoryStore          from './../Stores/Songs_In_Memory_Store.jsx';
import QueuedSongsStore            from './../Stores/Queued_Songs_Store.jsx';
import UpcomingRadioSongsStore     from './../Stores/Upcoming_Radio_Songs_Store.jsx';
import ViewedSongsStore            from './../Stores/Viewed_Songs_Store.jsx';
import ActionQueueStore            from './../Stores/Action_Queue_Store.jsx';
import CommercialsStore            from './../Stores/Commercials_Store.jsx';
import SearchResultsStore          from './../Stores/Search_Results_Store.jsx';



const Daemon = {};

var _hasInitialized = false;

var _hasRequestedLoadOfIntroMessage = false;
var _introAnnouncementIsPlaying     = false;

var _isChangingTracks    = false;
var _isPlayingCommercial = false;


var _isSeekingBeforeResumingPlay = false;

var introAnnouncement;

Daemon.run = function() {
  if (!_hasInitialized) {
    initialize();
  } else {
    if (_isChangingTracks) {
      handleTrackChangeSequence();
    } else if (_isSeekingBeforeResumingPlay) {
      resumePlayIfNoLongerSeeking();
    } else {
      engageSongPlaySequence();
    }
  }
};








const handleChangeSongGroupSequence = function() {
  let currentSong = QueuedSongsStore.currentSong(),
      currentSongNumber = currentSong.song_id;
  SongsInMemoryStore.resetSongNumber(currentSongNumber);


  let requestComesFromQueueTable = ActionQueueStore.doesRequestToPlayNewSongGroupComeFromAQueueTable(),
      requestComesFromRadioTable = ActionQueueStore.doesRequestToPlayNewSongGroupComeFromARadioTable(),
      requestComesFromSearchResultsTable = ActionQueueStore.doesRequestToPlayNewSongGroupComeFromASearchResultsTable(),
      requestedPosition          = ActionQueueStore.requestedPositionWithinSongGroup(),
      songGroup,
      songGroupDetails;


  if ( requestComesFromQueueTable ) {
    songGroup        = QueuedSongsStore.upcomingSongs();
    songGroupDetails = QueuedSongsStore.songGroupDetails();
  } else if ( requestComesFromRadioTable ) {
    songGroup        = UpcomingRadioSongsStore.upcomingRadioSongs();
    songGroupDetails = UpcomingRadioSongsStore.radioSongGroupDetails();
  } else if (requestComesFromSearchResultsTable) {
    songGroup        = SearchResultsStore.matchedSongs();
    songGroupDetails = SearchResultsStore.matchedSongsInfo();
  } else {
    songGroup        = ViewedSongsStore.songs();
    songGroupDetails = ViewedSongsStore.songGroupDetails();
  }

  QueuedSongsStore.resetQueuedSongsWithNewSongGroup(songGroup, songGroupDetails, requestedPosition);

  SongsInMemoryStore.handleLoading();
  forceSongsInMemoryUpdate();
  forceQueuedSongsStoreUpdate();
  forceUpcomingRadioSongsStoreUpdate();

  ActionQueueStore.removeRequestToPlayNewSongGroup();

  _isChangingTracks = true;
  if (!window.currentUser.isPremium) {
    ActionQueueStore.resetQueue();
    CommercialsStore.playCommercial();
    _isPlayingCommercial = true;
  };

};








const handleTrackChangeSequence = function() {
  if(_isPlayingCommercial) {
    if( CommercialsStore.hasCommercialConcluded() ) {
      CommercialsStore.switchInNextCommercial();
      _isPlayingCommercial = false;
    }
  } else {
    changeTracks();
  }
};

const changeTracks = function() {
  let currentSong = QueuedSongsStore.currentSong(),
      currentSongNumber = currentSong.song_id;
  SongsInMemoryStore.ensureSongLoaded(currentSong);

  if ( SongsInMemoryStore.isSongLoaded(currentSongNumber) ) {
    SongsInMemoryStore.resetSongNumber(currentSongNumber);
    if ( SongsInMemoryStore.isSongNotSeeking(currentSongNumber) ) {
      SongsInMemoryStore.startPlayForSongNumber(currentSongNumber);
      _isChangingTracks = false;
    }
  }
};






const initiateTrackChangeoverSequence = function(isRequestingPreviousTrack, isSongFinishedChangeover) {
  let currentSong = QueuedSongsStore.currentSong(),
      currentSongNumber = currentSong.song_id;

  _isChangingTracks = true;
  SongsInMemoryStore.resetSongNumber(currentSongNumber);
  if (isRequestingPreviousTrack) {
    moveToPreviousSong();
  } else {
    if (isSongFinishedChangeover && QueuedSongsStore.loopMode() === Modes.LOOP_SONG_MODE) {
      SongsInMemoryStore.resetSongNumber(currentSongNumber);
    } else {
      moveToNextSong();
    }
  }
  forceSongsInMemoryUpdate();
  forceQueuedSongsStoreUpdate();
  if (!window.currentUser.isPremium) {
    ActionQueueStore.resetQueue();
    CommercialsStore.playCommercial();
    _isPlayingCommercial = true;
  };
};






const handleIncomingMessages = function() {
  if ( ActionQueueStore.hasThereBeenARequestToPlayANewSongGroup() ) {
    handleChangeSongGroupSequence();
  } else if ( ActionQueueStore.hasThereBeenARequestToPauseTheCurrentSong() ) {
    handlePauseCurrentSongRequest();
  } else if ( ActionQueueStore.hasThereBeenARequestToResumePlayForTheCurrentSong() ) {
    handleResumePlayForCurrentSongRequest();
  } else if ( ActionQueueStore.hasThereBeenARequestToSeekToALocationInTheSong() ) {
    handleSongSeekRequest();
  } else if (ActionQueueStore.hasThereBeenARequestToMoveToTheNextSong() ) {
    ActionQueueStore.removeRequestToMoveToTheNextSong();
    initiateTrackChangeoverSequence(null);
  } else if ( ActionQueueStore.hasThereBeenARequestToMoveToThePreviousSong() ) {
    ActionQueueStore.removeRequestToMoveToThePreviousSong();
    initiateTrackChangeoverSequence(true);
  }
};



const handleResumePlayForCurrentSongRequest = function() {
  let currentSong = QueuedSongsStore.currentSong();
  let currentSongNumber = currentSong.song_id;

  SongsInMemoryStore.playSongNumber(currentSongNumber);
  ActionQueueStore.removeRequestToResumePlayForTheCurrentSong();
};

const handlePauseCurrentSongRequest = function() {
  let currentSong = QueuedSongsStore.currentSong();
  let currentSongNumber = currentSong.song_id;

  SongsInMemoryStore.pauseSongNumber(currentSongNumber);
  ActionQueueStore.removeRequestToPauseTheCurrentSong();
};

const handleSongSeekRequest = function() {
  let currentSong       = QueuedSongsStore.currentSong(),
      currentSongNumber = currentSong.song_id,
      requestedLocationWithinSongToSeekTo = ActionQueueStore.requestedLocationWithinSongToSeekTo();


  SongsInMemoryStore.seekToPositionForSongNumber(requestedLocationWithinSongToSeekTo, currentSongNumber);
  _isSeekingBeforeResumingPlay = true;
  ActionQueueStore.removeRequestToSeekToALocationInTheSong();
}


const resumePlayIfNoLongerSeeking = function() {
  let currentSong = QueuedSongsStore.currentSong(),
      currentSongNumber = currentSong.song_id;

  if ( SongsInMemoryStore.isSongNotSeeking(currentSongNumber) ) {
    SongsInMemoryStore.playSongNumber(currentSongNumber);
    _isSeekingBeforeResumingPlay = false;
  };
};








const engageSongPlaySequence = function() {
  let currentSong = QueuedSongsStore.currentSong();
  let currentSongNumber = currentSong.song_id;

  if ( !ActionQueueStore.noRequestsAreInQueue() ) {
    handleIncomingMessages();
  } else {
    if ( SongsInMemoryStore.hasPlayFinishedForSongNumber(currentSongNumber) ) {
      initiateTrackChangeoverSequence(false, true);
    } else {
      forceSongsInMemoryUpdate();
    }
  }

};

const moveToNextSong = function() {
  QueuedSongsStore.moveForward();
  SongsInMemoryStore.handleLoading();
  forceQueuedSongsStoreUpdate();
  forceUpcomingRadioSongsStoreUpdate();
};

const moveToPreviousSong = function() {
  QueuedSongsStore.moveToPrevious();
  SongsInMemoryStore.handleLoading();
  forceQueuedSongsStoreUpdate();
  forceUpcomingRadioSongsStoreUpdate();
};


const forceSongsInMemoryUpdate = function() {
  Dispatcher.dispatch({
    actionType: ActionConstants.ASYNC_FORCE_SONGS_IN_MEMORY_UPDATE
  });
};

const forceQueuedSongsStoreUpdate = function() {
  Dispatcher.dispatch({
    actionType: ActionConstants.ASYNC_FORCE_QUEUED_SONGS_STORE_UPDATE
  });
};

const forceUpcomingRadioSongsStoreUpdate = function() {
  Dispatcher.dispatch({
    actionType: ActionConstants.ASYNC_FORCE_UPCOMING_RADIO_SONGS_STORE_UPDATE
  });
};

// INITIALIZERS ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const initialize = function() {
  if (_hasRequestedLoadOfIntroMessage) {
    handlePostIntroMessageLoadRequestSequence();
  } else {
    loadIntroMessage();
  }
};

const handlePostIntroMessageLoadRequestSequence = function() {
  if (!_introAnnouncementIsPlaying) {
    attemptToPlayIntroMessage();
  } else {
    handleIntroMessageIsPlayingSequence();
  }
};

const handleIntroMessageIsPlayingSequence = function() {
  if (introAnnouncement.ended) {

    let firstSong = QueuedSongsStore.currentSong();
    let firstSongNumber = firstSong.song_id;

    SongsInMemoryStore.ensureSongLoaded(firstSong);


    if (SongsInMemoryStore.isSongLoaded(firstSongNumber)) {
      SongsInMemoryStore.startPlayForSongNumber(firstSongNumber);
      _hasInitialized = true;
      CommercialsStore.loadCommercials();
    }

  }
};






const loadIntroMessage = function() {
  let introMessageURL;
  if(window.currentUser.isPremium) {
    introMessageURL = Settings.JOUNCE_PREMIUM_INTRO_URL;
  } else {
    introMessageURL = Settings.JOUNCE_FREE_INTRO_URL;
  }

  introAnnouncement = document.createElement("AUDIO");
  introAnnouncement.src  = introMessageURL;
  introAnnouncement.load();
  _hasRequestedLoadOfIntroMessage = true;
};


const attemptToPlayIntroMessage = function() {
  if (introAnnouncement.readyState === 4) {
    requestToLoadFirstSong();
    introAnnouncement.play();
    SongsInMemoryStore.handleLoading();
    _introAnnouncementIsPlaying = true;
  }
};





const requestToLoadFirstSong = function() {
  SongsInMemoryStore.setQueuedSongsStore(QueuedSongsStore);
  QueuedSongsStore.setUpcomingRadioSongsStore(UpcomingRadioSongsStore);

  let firstSong = QueuedSongsStore.currentSong();
  let firstSongNumber = firstSong.song_id;

  SongsInMemoryStore.ensureSongLoaded(firstSong);

};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

module.exports = Daemon;
