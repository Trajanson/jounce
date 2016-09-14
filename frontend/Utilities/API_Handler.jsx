"require strict";

module.exports = {

  submitNewPlaylistRequest(playlistData, successCallbackFunction) {
    $.ajax({
      type: "POST",
      url: window.applicationRoutes.createPlaylistRoute,
      data: jQuery.param({ playlist: playlistData.playlist}),
      success (playlist) {
        successCallbackFunction(playlist.playlist);
      }
    });

  },


  submitNewSongLikeRequest(songId, successCallbackFunction) {
    $.ajax({
      type: "POST",
      url: window.applicationRoutes.createSongLikeRoute,
      data: {
        song_like: {
          song_id: songId,
        }
      },
      success (songLike) {
        successCallbackFunction(songLike.song_like);
      }
    });
  },

  submitNewSongUnlikeRequest(songId, successCallbackFunction) {
    $.ajax({
      type: "DELETE",
      url: window.applicationRoutes.destroySongLikeRoute,
      data: {
        song_like: {
          song_id: songId,
        }
      },
      success (songUnlike) {
        successCallbackFunction(songUnlike.song_like);
      }
    });
  },




  submitNewSongRating(songId, rating, successCallbackFunction) {
    $.ajax({
      type: "PATCH",
      url: window.applicationRoutes.declareSongRatingRoute,
      data: {
        song_rating: {
          song_id: songId,
          rating: rating,
        }
      },
      success (songRating) {
        successCallbackFunction(songRating.song_rating);
      }
    });
  },


  retrieveFollowedAlbums(successCallbackFunction) {
    $.ajax({
      type: "GET",
      url: window.applicationRoutes.getFollowedAlbumsRoute,
      success (followedAlbums) {
        successCallbackFunction(followedAlbums.albums);
      }
    });
  },






  retrieveSongsForAlbum(albumId, successCallbackFunction) {
    $.ajax({
      type: "GET",
      url: window.applicationRoutes.albumShowRoute,
      data: {
        album: {
          id: albumId,
        }
      },
      success (albumInfoAndSongs) {
        successCallbackFunction(albumInfoAndSongs.album_info_and_songs);
      }
    });
  },










  submitNewAlbumLikeRequest(albumId, successCallbackFunction) {
    $.ajax({
      type: "POST",
      url: window.applicationRoutes.createAlbumLikeRoute,
      data: {
        album_like: {
          album_id: albumId,
        }
      },
      success (albumLike) {
        successCallbackFunction(albumLike.album_like);
      }
    });

  },

  submitNewAlbumUnlikeRequest(albumId, successCallbackFunction) {
    $.ajax({
      type: "DELETE",
      url: window.applicationRoutes.destroyAlbumLikeRoute,
      data: {
        album_like: {
          album_id: albumId,
        }
      },
      success (albumLike) {
        successCallbackFunction(albumLike.album_like);
      }
    });

  },




  requestSocialContent(successCallbackFunction) {
    $.ajax({
      type: "GET",
      url: window.applicationRoutes.getSocialContentRoute,
      success (socialContent) {
        console.log(socialContent);
        successCallbackFunction(socialContent.social_content);
      }
    });
  },





  retrieveSongsForPlaylist(playlistId, successCallbackFunction) {
    $.ajax({
      type: "GET",
      url: window.applicationRoutes.playlistShowRoute,
      data: {
        playlist: {
          id: playlistId,
        }
      },
      success (playlistInfoAndSongs) {
        successCallbackFunction(playlistInfoAndSongs.playlist_info_and_songs);
      }
    });
  },

  retrieveSongsLikedByCurrentUser(successCallbackFunction) {
    $.ajax({
      type: "GET",
      url: window.applicationRoutes.songsLikedByCurrentUserShowRoute,
      success (likedSongsInfoAndSongs) {
        console.log("callback: ", successCallbackFunction);
        console.log(likedSongsInfoAndSongs.song_likes_info_and_songs);
        successCallbackFunction(likedSongsInfoAndSongs.song_likes_info_and_songs);
      }
    });
  },








  createFriendship(userId, successCallbackFunction) {
    $.ajax({
      type: "POST",
      url: window.applicationRoutes.createFriendshipRoute,
      data: {
        friendship: {
          friend_id: userId,
        }
      },
      success (friendship) {
        console.log(friendship);
        successCallbackFunction(friendship.friend);
      }
    });
  },

  destroyFriendship(userId, successCallbackFunction) {
    $.ajax({
      type: "DELETE",
      url: window.applicationRoutes.destroyFriendshipRoute,
      data: {
        friendship: {
          friend_id: userId,
        }
      },
      success (friendship) {
        console.log(friendship);
        successCallbackFunction(friendship.friend);
      }
    });
  },








  submitRequestToAddSongToPlaylist(playlistId, songId, successCallbackFunction) {
    $.ajax({
      type: "POST",
      url: window.applicationRoutes.createPlaylistSongRoute,
      data: {
        playlist_song: {
          playlist_id: playlistId,
          song_id: songId,
        }
      },
      success (playlistSong) {
        successCallbackFunction(playlistSong.playlist_song);
      }
    });
  },

  submitRequestToRemoveSongFromPlaylist(playlistId, songId, successCallbackFunction) {
    $.ajax({
      type: "DELETE",
      url: window.applicationRoutes.destroyPlaylistSongRoute,
      data: {
        playlist_song: {
          playlist_id: playlistId,
          song_id: songId,
        }
      },
      success (playlistSong) {
        successCallbackFunction(playlistSong.playlist_song);
      }
    });
  },



  fetchNewSongsForRadio(successCallbackFunction) {
    $.ajax({
      type: "GET",
      url: window.applicationRoutes.retrieveAdditionalSongsForRadioRoute,
      success(newSongsForRadio) {
        successCallbackFunction(newSongsForRadio.radio_station_info_and_songs);
      }
    });
  },










};