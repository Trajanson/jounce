import React                     from 'react';

import HeaderBar                 from './Header_Bar.jsx';
import NotificationBar           from './Notification_Bar.jsx';
import InteractiveConsole        from './Interactive_Console.jsx';
import AudioPanel                from './Audio_Panel/Audio_Panel.jsx';
import Modal                     from './Modal/Modal.jsx';

import Modes                     from './../Constants/Modes.jsx';
import Settings                  from './../Constants/Settings.jsx';

import AudioControllerDaemon     from './../Utilities/Audio_Controller_Daemon.jsx';



const Console = React.createClass({

  componentDidMount() {
    window.setInterval(function(){
       AudioControllerDaemon.run();
     }, Settings.AVERAGE_MILLISECONDS_BETWEEN_DAEMON_RUNS);
  },

  getInitialState() {
    return ({
      modalStyle: {
        display: "none",
      },
      modalContent: Modes.NO_MODAL_CONTENT,
      modalSongId: null,
      modalCurrentPlaylistId: null,
    });
  },

  openNewPlaylistModal(event) {
    this.setState({
      modalStyle: {
        display: "block",
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
      },
      modalContent: Modes.NEW_PLAYLIST_MODAL_CONTENT,
    });
  },

  openSongMenuModal(event, songId, currentPlaylistId) {
    this.setState({
      modalStyle: {
        display: "block",
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
      },
      modalContent: Modes.SONG_MENU_MODAL_CONTENT,
      modalSongId: songId,
      modalCurrentPlaylistId: currentPlaylistId,
    });
  },

  closeModal() {
    this.setState({
      modalStyle: {
        display: "none",
      },
      modalContent: Modes.NO_MODAL_CONTENT,
      modalSongId: null,
      modalCurrentPlaylistId: null,
    });
  },

  handleClick(event) {
    if (this.state.modalStyle.display === "block") {
      console.log("test");
      this.closeModal();
    }
  },


  render() {
    return(
      <div onClick={this.handleClick} id="allContent" >
        <HeaderBar />

        <NotificationBar />

        <InteractiveConsole openNewPlaylistModalAction={ this.openNewPlaylistModal }
                            openSongMenuModal={ this.openSongMenuModal }
                            closeModalAction={ this.closeModal }
                            consoleContent={ this.props.children }
        />

        <AudioPanel />

        <Modal style={        this.state.modalStyle }
               modalContent={ this.state.modalContent }
               closeModal={   this.closeModal }
               modalSongId={  this.state.modalSongId }
               modalCurrentPlaylistId= { this.state.modalCurrentPlaylistId }
        />

    </div>
    );
  }

});

module.exports = Console;
