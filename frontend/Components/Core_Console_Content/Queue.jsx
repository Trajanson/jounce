"require strict";

import React                    from 'react';
import QueuedSongsStore         from './../../Stores/Queued_Songs_Store.jsx';

import SongTable                from './Song_Table/Song_Table.jsx'


var Queue = React.createClass({
  getInitialState() {
    return ({
      songs: [],
      songGroupDetails: {},
    });
  },

  componentDidMount() {
    this.queuedSongsStoreListener   = QueuedSongsStore.addListener(this.updateStateToReflectQueuedSongsStore);
    this.setState({
      songs:            QueuedSongsStore.upcomingSongs(),
      songGroupDetails: QueuedSongsStore.songGroupDetails(),
    });
  },

  componentWillUnmount () {
    this.queuedSongsStoreListener.remove();
  },

  updateStateToReflectQueuedSongsStore() {
    let songs            = QueuedSongsStore.upcomingSongs(),
        songGroupDetails = QueuedSongsStore.songGroupDetails();

    this.setState({
      songs:            songs,
      songGroupDetails: songGroupDetails,
    });
  },



  render() {
    console.log(this.state.songs);
    return (
        <div id="inner-core-content-container">
          <div className="music-table-container">
            <div className="music-table-title">
              Queue
            </div>
            <SongTable songs={this.state.songs}
                       openSongMenuModal={ this.props.openSongMenuModal }
                       isInQueueTable={ true }
            />
          </div>
        </div>
    );
  }

});

module.exports = Queue;
