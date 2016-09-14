"require strict";

import React              from 'react';

import LeftConsoleColumn  from './Left_Console_Column/Left_Console_Column.jsx';
import RightConsoleColumn from './Right_Console_Column/Right_Console_Column.jsx';


const InteractiveConsole = React.createClass({
  render () {
    return (
      <div id="interactive-console">
        <LeftConsoleColumn openNewPlaylistModalAction={ this.props.openNewPlaylistModalAction }
                           closeModalAction={ this.props.closeModalAction }
        />
      <div id="core-content">
        { React.cloneElement(this.props.consoleContent,
                             {
                               openSongMenuModal: this.props.openSongMenuModal,
                             }

                            )
        }
      </div>
        <RightConsoleColumn />
      </div>
    );
  }
});

module.exports = InteractiveConsole;
