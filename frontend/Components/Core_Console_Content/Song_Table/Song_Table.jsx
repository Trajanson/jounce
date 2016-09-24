"require strict";

import React       from 'react';

import TableRow from './Table_Row.jsx'


var SongTable = React.createClass({

    render() {
      let songTable = this;
      let openSongMenuModalAction = this.props.openSongMenuModal;
      let isInQueueTable,
          isInRadioTable,
          isInSearchResultsTable;
      if (this.props && this.props.isInQueueTable) {
        isInQueueTable = true;
      } else {
        isInQueueTable = false;
      }
      if (this.props && this.props.isInRadioTable) {
        isInRadioTable = true;
      } else {
        isInRadioTable = false;
      }
      if (this.props && this.props.isInSearchResultsTable) {
        isInSearchResultsTable = true;
      } else {
        isInSearchResultsTable = false;
      }

      let rows = this.props.songs.map(function(song, index) {
        return (
          <TableRow title={             song.title }
                    isFollowed={        song.is_followed }
                    artist={            song.artist_name }
                    album={             song.album_title }
                    starRating={        song.star_rating }
                    artistId={          song.artist_id}
                    albumId={           song.album_id}
                    songId={            song.song_id }
                    songDuration={      song.duration }
                    openSongMenuModal={ openSongMenuModalAction }
                    indexInCurrentSongList={ index + 1 }
                    key={               index }
                    isInQueueTable={    isInQueueTable }
                    isInRadioTable={    isInRadioTable }
                    isInSearchResultsTable={    isInSearchResultsTable }
          />
        );
      });


      return (
        <table className="song-display-table">
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th><span className="fa fa-heart" aria-hidden="true"></span></th>
              <th>Song</th>
              <th>Artist</th>
              <th>Album</th>
              <th></th>
              <th>Time</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            { rows }
          </tbody>


        </table>
      );
    },
})

module.exports = SongTable;
