"require strict";

import React                    from 'react';

import UpcomingRadioSongsStore  from './../../Stores/Upcoming_Radio_Songs_Store.jsx';
import QueuedSongsStore         from './../../Stores/Queued_Songs_Store.jsx';

import ViewedSongSActions       from './../../Actions/Viewed_Songs_Actions.jsx';

import SongTable                from './Song_Table/Song_Table.jsx'


var Radio = React.createClass({

  currentRadioStationId() {
    return 1;
  },

  getInitialState() {
    return ({
      isInitializing: true,
      songs: [],
      songGroupDetails: {},
    });
  },

  componentDidMount() {
    this.upcomingRadioSongsStoreListener = UpcomingRadioSongsStore.addListener(this.updateStateToReflectUpcomingRadioSongsStore);
    this.queuedSongsStoreListener = QueuedSongsStore.addListener(this.updateStateToReflectUpcomingRadioSongsStore);
    if (this.state.isInitializing) {
      this.setState({
        songs: UpcomingRadioSongsStore.upcomingRadioSongs(),
        songGroupDetails: UpcomingRadioSongsStore.radioSongGroupDetails(),
        isInitializing: false,
      });
    } else {
      console.log("COMPLETE THIS");
      ViewedSongsActions.fetchMoreSongsForRadio();
    }
  },

  componentWillUnmount () {
    this.upcomingRadioSongsStoreListener.remove();
    this.queuedSongsStoreListener.remove();
  },

  componentWillReceiveProps() {
    let queuedSongGroupDetails = QueuedSongsStore.songGroupDetails(),
        viewedRadioIsInQueue   = queuedSongGroupDetails.type === "Radio" && queuedSongGroupDetails.radio_id ===  this.currentRadioStationId();

    if ( viewedRadioIsInQueue ) {
      this.setState({
        songs: UpcomingRadioSongsStore.upcomingRadioSongs(),
        songGroupDetails: UpcomingRadioSongsStore.radioSongGroupDetails(),
        isInitializing: false,
      });
    } else {
      console.log("FETCH INITIAL SONGS FOR RADIO!");
      ViewedSongsActions.fetchInitialSongsForRadio();
    };
  },

  updateStateToReflectUpcomingRadioSongsStore() {
    let songs            = UpcomingRadioSongsStore.upcomingRadioSongs(),
        songGroupDetails = UpcomingRadioSongsStore.radioSongGroupDetails();

    this.setState({
      songs: songs,
      songGroupDetails: songGroupDetails,
    });
  },



  render() {
    console.log(this.state.songs);
    return (
        <div id="inner-core-content-container">
          <div className="music-table-container">
            <div className="music-table-title">
              { this.state.songGroupDetails.radio_station_name }
            </div>
            <SongTable songs={this.state.songs}
                       openSongMenuModal={ this.props.openSongMenuModal }
                       isInQueueTable={ false }
                       isInRadioTable={ true }
            />
          </div>
        </div>
    );
  }

});

module.exports = Radio;
