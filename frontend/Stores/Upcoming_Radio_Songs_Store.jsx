import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const UpcomingRadioSongsStore = new Store(Dispatcher);

let _upcomingRadioSongs = window.initialSongsToLoadForRadio.slice(0);

let _radioSongGroupDetails = Object.assign({}, window.informationOnGroupOfInitialSongsToLoadForRadio);








UpcomingRadioSongsStore.upcomingRadioSongs = function() {
  return _upcomingRadioSongs;
};

UpcomingRadioSongsStore.radioSongGroupDetails = function() {
  return _radioSongGroupDetails;
};






UpcomingRadioSongsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  }
};


module.exports = UpcomingRadioSongsStore;
