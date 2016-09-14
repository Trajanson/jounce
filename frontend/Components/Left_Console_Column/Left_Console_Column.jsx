"require strict";

import React            from 'react';

import NavigationColumn from './Navigation_Column.jsx';
import CurrentSongPanel from './Current_Song_Panel.jsx';


var LeftConsoleColumn = React.createClass({

  render: function() {
    return (
      <div id="left-column">
        <NavigationColumn openNewPlaylistModalAction={ this.props.openNewPlaylistModalAction }
                          closeModalAction={ this.props.closeModalAction }
         />
        <CurrentSongPanel />

      </div>
    );
  }

});

module.exports = LeftConsoleColumn;
