"require strict";

import React              from 'react';

import PlayListActionButtons from './PlayList_Action_Buttons.jsx';
import SongProgressBar       from './Song_Progress_Bar.jsx';
import AudioControlButtons   from './Audio_Control_Buttons.jsx';
import VolumeControlBar      from './Volume_Control_Bar.jsx';

const AudioPanel = React.createClass({
  render () {
    return (
      <div id="audio-panel">
        <PlayListActionButtons />
        <SongProgressBar       />
        <AudioControlButtons   />
        <VolumeControlBar      />
      </div>
    );
  }
});

module.exports = AudioPanel;
