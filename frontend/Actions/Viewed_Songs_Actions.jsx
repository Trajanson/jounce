"require strict";

import ActionConstants    from './../Constants/Action_Constants.jsx';
import APIHandler         from './../Utilities/API_Handler.jsx';
import Dispatcher         from './../Dispatcher/Dispatcher.jsx';


module.exports = {
  likeSong(songId) {
    APIHandler.submitNewSongLikeRequest(songId, this.notifyViewedSongsStoreOfLikedSong);
  },

  notifyViewedSongsStoreOfLikedSong(songLike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_NEW_SONG_LIKE,
      songLike:      songLike,
    });
  },

  unlikeSong(songId) {
    APIHandler.submitNewSongUnlikeRequest(songId, this.notifyViewedSongsStoreOfUnlikedSong);
  },

  unlikeSongFromWithinSongLikesPlaylist(songId) {
    APIHandler.submitNewSongUnlikeRequest(songId, this.notifyViewedSongsStoreOfUnlikedSongFromWithinSongLikesPlaylist);
  },


  notifyViewedSongsStoreOfUnlikedSong(songUnlike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_REMOVED_SONG_LIKE,
      songUnlike:      songUnlike,
    });
  },

  notifyViewedSongsStoreOfUnlikedSongFromWithinSongLikesPlaylist(songUnlike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_REMOVED_SONG_LIKE_FROM_WITHIN_SONG_LIKES_PLAYLIST,
      songUnlike:      songUnlike,
    });
  },







  postNewSongRating(songId, rating) {
    APIHandler.submitNewSongRating(songId, rating, this.notifyViewedSongsStoreOfNewSongRating);
  },

  notifyViewedSongsStoreOfNewSongRating(songRating) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_NEW_SONG_RATING,
      songRating:      songRating,
    });
  },






  retrieveSongsForAlbum(albumId) {
    APIHandler.retrieveSongsForAlbum(albumId, this.sendAlbumInfoAndAlbumSongsToViewedSongStore);
  },

  sendAlbumInfoAndAlbumSongsToViewedSongStore(albumInfoAndSongs) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_UPDATED_LIST_OF_SONGS_FOR_ALBUM,
      albumInfo:      albumInfoAndSongs.album_info,
      songs:          albumInfoAndSongs.songs,
    });
  },








  followAlbum(albumId) {
    APIHandler.submitNewAlbumLikeRequest(albumId, this.notifyViewedSongsStoreThatAlbumHasBeenFollowed);
  },

  notifyViewedSongsStoreThatAlbumHasBeenFollowed(albumLike) {
    console.log(albumLike);
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_THAT_ALBUM_HAS_BEEN_FOLLOWED,
      albumLike:      albumLike,
    });
  },

  unfollowAlbum(albumId) {
    APIHandler.submitNewAlbumUnlikeRequest(albumId, this.notifyViewedSongsStoreThatAlbumHasBeenUnfollowed);
  },

  notifyViewedSongsStoreThatAlbumHasBeenUnfollowed(albumUnlike) {
    console.log(albumUnlike);
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_THAT_ALBUM_HAS_BEEN_UNFOLLOWED,
      albumUnlike:      albumUnlike,
    });
  },






  retrieveSongsForPlaylist(playlistId) {
    APIHandler.retrieveSongsForPlaylist(playlistId, this.sendPlaylistInfoAndPlaylistSongsToViewedSongStore);
  },

  sendPlaylistInfoAndPlaylistSongsToViewedSongStore(playlistInfoAndSongs) {
    console.log(playlistInfoAndSongs);
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_UPDATED_LIST_OF_SONGS_FOR_PLAYLIST,
      playlistInfo:      playlistInfoAndSongs.playlist_info,
      songs:             playlistInfoAndSongs.songs,
    });
  },

  fetchSongsLikedByCurrentUser() {
    APIHandler.retrieveSongsLikedByCurrentUser(this.sendSongLikesInfoAndSongsToViewedSongStore);
  },

  sendSongLikesInfoAndSongsToViewedSongStore(songLikeInfoAndSongs) {
    Dispatcher.dispatch({
      actionType:        ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_UPDATED_LIST_OF_SONGS_FOR_PLAYLIST,
      playlistInfo:      songLikeInfoAndSongs.song_likes_info,
      songs:             songLikeInfoAndSongs.songs,
    });
  },


  fetchInitialSongsForRadio() {
    APIHandler.fetchNewSongsForRadio(this.placeFetchedRadioSongsIntoQueue);
  },

  placeFetchedRadioSongsIntoQueue(songsAndInfo) {
    console.log("radio songs retrieved from API",
                songsAndInfo);
    Dispatcher.dispatch({
      actionType: ActionConstants.RESET_QUEUED_SONGS_WITH_NEW_SONGS_FROM_RADIO_API,
      newSongsToQueue: songsAndInfo.songs,
      newSongsToQueueDetails: songsAndInfo.radio_station_info,
      currentIndexInSongList: 0
    });
  },

};
