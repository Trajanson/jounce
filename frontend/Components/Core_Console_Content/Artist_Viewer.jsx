"require strict";

import React                    from 'react';
import ViewedSongsStore         from './../../Stores/Viewed_Songs_Store.jsx';

import SongTable                from './Song_Table/Song_Table.jsx'


var ArtistViewer = React.createClass({

  render: function() {
    return (
      <div id="core-content">
        Artist Viewer
      </div>
    );
  }

});

module.exports = ArtistViewer;
