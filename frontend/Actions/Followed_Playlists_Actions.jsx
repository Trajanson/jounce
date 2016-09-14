"require strict";

import ActionConstants    from './../Constants/Action_Constants.jsx';
import APIHandler         from './../Utilities/API_Handler.jsx';
import Dispatcher         from './../Dispatcher/Dispatcher.jsx';


module.exports = {
  createPlaylist(playlistData) {
    APIHandler.submitNewPlaylistRequest(playlistData, this.informFollowedPlaylistsStoreOfNewPlaylist)
  },

  informFollowedPlaylistsStoreOfNewPlaylist(newPlaylist) {
    Dispatcher.dispatch({
      actionType: ActionConstants.STORE_PLAYLISTS_FOLLOWED_BY_USER_INTO_STORE,
      newPlaylist:      newPlaylist,
    });
  },


  requestToAddSongToPlaylist(playlistId, songId) {
    APIHandler.submitRequestToAddSongToPlaylist(playlistId, songId, this.informViewedSongsStoreOfNewSongInPlaylist);
  },

  informViewedSongsStoreOfNewSongInPlaylist(playlistSong) {
    console.log(playlistSong);
    Dispatcher.dispatch({
      actionType: ActionConstants.ADD_SONG_TO_PLAYLIST_IF_RELEVANT,
      playlistSong:      playlistSong,
    });
  },


  requestToRemoveSongFromPlaylist(playlistId, songId) {
    APIHandler.submitRequestToRemoveSongFromPlaylist(playlistId, songId, this.informViewedSongsStoreOfRemovedSongFromPlaylist);
  },

  informViewedSongsStoreOfRemovedSongFromPlaylist(playlistSong) {
    console.log(playlistSong);
    Dispatcher.dispatch({
      actionType: ActionConstants.REMOVE_SONG_FROM_PLAYLIST_IF_RELEVANT,
      playlistSong:      playlistSong,
    });
  },




};
