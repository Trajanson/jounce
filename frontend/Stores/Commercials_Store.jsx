import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const CommercialsStore = new Store(Dispatcher);

const _commercials = [];

let commercialsToLoad = [
  {
    sponsor: "Smarty Pants App",
    url_path: "https://s3.amazonaws.com/jounce-music-player-storage/commercials/smartypants.m4a",
  },
  {
    sponsor: "Jounce Premium",
    url_path: "https://s3.amazonaws.com/jounce-music-player-storage/commercials/jouncePremiumCommercial.mov",
  },
  {
    sponsor: "MeetupClone.com",
    url_path: "https://s3.amazonaws.com/jounce-music-player-storage/commercials/meetupclone.wav",
  },
];


CommercialsStore.hasCommercialLoaded = function() {
  return (
    _commercials[0].readyState === 4
  );
}

CommercialsStore.hasCommercialConcluded = function() {
  return (
    _commercials[0].ended
  );
}

CommercialsStore.playCommercial = function() {
  _commercials[0].play();
}


CommercialsStore.switchInNextCommercial = function() {
  let firstCommercial = _commercials.shift();
  _commercials.push(firstCommercial);
  firstCommercial.currentTime = 0;
}


CommercialsStore.loadCommercials = function() {
  commercialsToLoad.forEach(function(commercialInfo, index) {
    let commercialAudio = document.createElement("AUDIO");
    commercialAudio.src = commercialInfo.url_path;
    commercialAudio.load();
    _commercials.push(commercialAudio);
  });
};


CommercialsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  }
};


module.exports = CommercialsStore;
