import Dispatcher            from './../Dispatcher/Dispatcher.jsx';
import { Store }             from 'flux/utils';

import ActionConstants       from './../Constants/Action_Constants.jsx';

const ViewedSongsStore = new Store(Dispatcher);

let _viewedSongs     =  [];

let _songGroupDetails = {};

const addLikesFor = function (songLike) {
  _viewedSongs.forEach(function(viewedSong) {
    if (songLike.song_id === viewedSong.song_id) {
      viewedSong.is_followed = true;
    }
  });
};

const removeLikesFor = function (songUnlike) {
  _viewedSongs.forEach(function(viewedSong) {
    if (songUnlike.song_id === viewedSong.song_id) {
      viewedSong.is_followed = false;
    }
  });
};

const removeLikesForAndRemoveFromPage = function (songUnlike) {
  let newViewedSongs = [];
  _viewedSongs.forEach(function(viewedSong) {
    if (songUnlike.song_id !== viewedSong.song_id) {
      newViewedSongs.push(viewedSong);
    }
  });
  _viewedSongs = newViewedSongs;
};


const updateSongLikes = function(songRating) {
  _viewedSongs.forEach(function(viewedSong) {
    if (songRating.song_id === viewedSong.song_id) {
      viewedSong.star_rating = songRating.rating;
    }
  });

};


const recieveAlbumInfoAndAlbumSongs = function(albumInfo, songs) {
  _songGroupDetails = albumInfo;
  _viewedSongs      = songs;
};

const recieveArtistInfoAndArtistSongs = function(artistInfo, songs) {
  _songGroupDetails = artistInfo;
  _viewedSongs      = songs;
};


const addAlbumLikeFor = function(albumLike) {
  _songGroupDetails.is_followed = true;
};


const removeAlbumLikeFor = function(albumUnlike) {
  _songGroupDetails.is_followed = false;
};


const addArtistLikeFor = function(artistLike) {
  _songGroupDetails.is_followed = true;
};


const removeArtistLikeFor = function(artistLike) {
  _songGroupDetails.is_followed = false;
};



const recievePlaylistInfoAndPlaylistSongs = function(playlistInfo, songs) {
  _songGroupDetails = playlistInfo;
  _viewedSongs      = songs;
  console.log(_songGroupDetails);
};

const addSongToViewedSongsIfSamePlaylist = function(playlistSong) {
  let playlist = playlistSong.playlist,
      song     = playlistSong.song;
  console.log("_songGroupDetails", _songGroupDetails);
  console.log("playlist", playlist);
  console.log("song", song);

  if (_songGroupDetails.type === "Playlist" && _songGroupDetails.id === playlist.id) {
    _viewedSongs.push(song);
  }
};



const removeSongFromViewedSongsIfSamePlaylist = function(playlistSong) {
  let playlist = playlistSong.playlist,
      song     = playlistSong.song,
      count    = 0,
      newViewedSongs = [];
  console.log("_songGroupDetails", _songGroupDetails);
  console.log("playlist", playlist);
  console.log("song", song);
  if (_songGroupDetails.type === "Playlist" && _songGroupDetails.id === playlist.id) {
    _viewedSongs.forEach(function(viewedSong, index) {
      if (viewedSong.song_id === song.song_id) {
        if (count < 1) {

        } else {
          newViewedSongs.push(viewedSong);
        }
      } else {
        newViewedSongs.push(viewedSong);
      }
    });

    _viewedSongs = newViewedSongs;
  }




  if (_songGroupDetails.type === "Playlist" && _songGroupDetails.id === playlist.id) {
    if (count < 1) {
      count += 1;
      _viewedSongs.push(song);
    }

  }
};












ViewedSongsStore.songs = function() {
  return _viewedSongs;
};

ViewedSongsStore.songGroupDetails = function() {
  return _songGroupDetails;
};

ViewedSongsStore.durationOfAllSongs = function () {
  let duration = 0;
  _viewedSongs.forEach(function(song, index) {
    duration += song.duration;
  });

  return duration;
};

ViewedSongsStore.numberOfSongs = function () {
  return _viewedSongs.length;
};




ViewedSongsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {


    // SONG LIKES
    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_NEW_SONG_LIKE:
      addLikesFor(payload.songLike);
      this.__emitChange();
      break;
    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_REMOVED_SONG_LIKE:
      removeLikesFor(payload.songUnlike);
      this.__emitChange();
      break;
    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_REMOVED_SONG_LIKE_FROM_WITHIN_SONG_LIKES_PLAYLIST:
      removeLikesForAndRemoveFromPage(payload.songUnlike);
      this.__emitChange();
      break;


    // SONG RATINGS
    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_NEW_SONG_RATING:
      updateSongLikes(payload.songRating);
      this.__emitChange();
      break;


    // ALBUM SHOW
    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_UPDATED_LIST_OF_SONGS_FOR_ALBUM:
      recieveAlbumInfoAndAlbumSongs(payload.albumInfo, payload.songs)
      this.__emitChange();
      break;

    // ARTIST SHOW
    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_UPDATED_LIST_OF_SONGS_FOR_ARTIST:
      recieveArtistInfoAndArtistSongs(payload.artistInfo, payload.songs)
      this.__emitChange();
      break;


    // ALBUM LIKES
    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_THAT_ALBUM_HAS_BEEN_FOLLOWED:
      console.log(payload);
      addAlbumLikeFor(payload.albumLike)
      this.__emitChange();
      break;

    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_THAT_ALBUM_HAS_BEEN_UNFOLLOWED:
      removeAlbumLikeFor(payload.albumUnlike)
      this.__emitChange();
      break;


    // ARTIST LIKES
    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_THAT_ARTIST_HAS_BEEN_FOLLOWED:
      console.log(payload);
      addArtistLikeFor(payload.artistLike)
      this.__emitChange();
      break;

    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_THAT_ARTIST_HAS_BEEN_UNFOLLOWED:
      removeArtistLikeFor(payload.artistUnlike)
      this.__emitChange();
      break;



    case ActionConstants.NOTIFY_VIEWED_SONG_STORE_OF_UPDATED_LIST_OF_SONGS_FOR_PLAYLIST:
      console.log(payload);
      recievePlaylistInfoAndPlaylistSongs(payload.playlistInfo, payload.songs)
      this.__emitChange();
      break;



    // PLAYLIST SONGS
    case ActionConstants.ADD_SONG_TO_PLAYLIST_IF_RELEVANT:
      addSongToViewedSongsIfSamePlaylist(payload.playlistSong)
      this.__emitChange();
      break;
    case ActionConstants.REMOVE_SONG_FROM_PLAYLIST_IF_RELEVANT:
      removeSongFromViewedSongsIfSamePlaylist(payload.playlistSong)
      this.__emitChange();
      break;
  }


};

module.exports = ViewedSongsStore;
