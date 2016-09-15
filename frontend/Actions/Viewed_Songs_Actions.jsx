"require strict";

import ActionConstants    from './../Constants/Action_Constants.jsx';
import APIHandler         from './../Utilities/API_Handler.jsx';
import Dispatcher         from './../Dispatcher/Dispatcher.jsx';


module.exports = {
  likeSong(songId, isFromQueueTable, isFromRadioTable) {
    let callbackFunction;
    if (isFromQueueTable) {
      callbackFunction = this.notifyQueuedSongsStoreOfLikedSong;
    } else if (isFromRadioTable) {
      callbackFunction = this.notifyRadioSongsStoreOfLikedSong;
    } else {
      callbackFunction = this.notifyViewedSongsStoreOfLikedSong;
    }
    APIHandler.submitNewSongLikeRequest(songId, callbackFunction);
  },

  notifyViewedSongsStoreOfLikedSong(songLike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_NEW_SONG_LIKE,
      songLike:      songLike,
    });
  },

  notifyQueuedSongsStoreOfLikedSong(songLike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_QUEUED_SONG_STORE_OF_NEW_SONG_LIKE,
      songLike:      songLike,
    });
  },

  notifyRadioSongsStoreOfLikedSong(songLike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_RADIO_SONG_STORE_OF_NEW_SONG_LIKE,
      songLike:      songLike,
    });
  },

  unlikeSong(songId, isFromQueueTable, isFromRadioTable) {
    let callbackFunction;
    if (isFromQueueTable) {
      callbackFunction = this.notifyQueuedSongsStoreOfUnlikedSong;
    } else if (isFromRadioTable) {
      callbackFunction = this.notifyRadioSongsStoreOfUnlikedSong;
    } else {
      callbackFunction = this.notifyViewedSongsStoreOfUnlikedSong;
    }
    APIHandler.submitNewSongUnlikeRequest(songId, callbackFunction);
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

  notifyRadioSongsStoreOfUnlikedSong(songUnlike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_RADIO_SONG_STORE_OF_REMOVED_SONG_LIKE,
      songUnlike:      songUnlike,
    });
  },

  notifyQueuedSongsStoreOfUnlikedSong(songUnlike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_QUEUED_SONG_STORE_OF_REMOVED_SONG_LIKE,
      songUnlike:      songUnlike,
    });
  },

  notifyViewedSongsStoreOfUnlikedSongFromWithinSongLikesPlaylist(songUnlike) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_REMOVED_SONG_LIKE_FROM_WITHIN_SONG_LIKES_PLAYLIST,
      songUnlike:      songUnlike,
    });
  },







  postNewSongRating(songId, rating, isFromQueueTable, isFromRadioTable) {
    let callbackFunction;
    if (isFromQueueTable) {
      callbackFunction = this.notifyQueuedSongsStoreOfNewSongRating;
    } else if (isFromRadioTable) {
      callbackFunction = this.notifyRadioSongsStoreOfNewSongRating;
    } else {
      callbackFunction = this.notifyViewedSongsStoreOfNewSongRating;
    }
    APIHandler.submitNewSongRating(songId, rating, callbackFunction);
  },

  notifyViewedSongsStoreOfNewSongRating(songRating) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_NEW_SONG_RATING,
      songRating:      songRating,
    });
  },

  notifyRadioSongsStoreOfNewSongRating(songRating) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_RADIO_SONG_STORE_OF_NEW_SONG_RATING,
      songRating:      songRating,
    });
  },

  notifyQueuedSongsStoreOfNewSongRating(songRating) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_QUEUED_SONG_STORE_OF_NEW_SONG_RATING,
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



  retrieveSongsForArtist(artistId) {
    APIHandler.retrieveSongsForArtist(artistId, this.sendArtistInfoAndArtistSongsToViewedSongStore);
  },

  sendArtistInfoAndArtistSongsToViewedSongStore(artistInfoAndSongs) {
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_UPDATED_LIST_OF_SONGS_FOR_ARTIST,
      artistInfo:      artistInfoAndSongs.artist_info,
      songs:           artistInfoAndSongs.songs,
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






  followArtist(artistId) {
    APIHandler.submitNewArtistLikeRequest(artistId, this.notifyViewedSongsStoreThatArtistHasBeenFollowed);
  },

  notifyViewedSongsStoreThatArtistHasBeenFollowed(artistLike) {
    console.log(artistLike);
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_THAT_ARTIST_HAS_BEEN_FOLLOWED,
      artistLike:      artistLike,
    });
  },

  unfollowArtist(artistId) {
    APIHandler.submitNewArtistUnlikeRequest(artistId, this.notifyViewedSongsStoreThatArtistHasBeenUnfollowed);
  },

  notifyViewedSongsStoreThatArtistHasBeenUnfollowed(artistUnlike) {
    console.log(artistUnlike);
    Dispatcher.dispatch({
      actionType: ActionConstants.NOTIFY_VIEWED_SONG_STORE_THAT_ARTIST_HAS_BEEN_UNFOLLOWED,
      artistUnlike:      artistUnlike,
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
