playlist = Playlist.find(@playlist_song.playlist_id)
song     = Song.find(@playlist_song.song_id)

json.playlist_song do

  json.playlist do
    json.partial! 'api/playlists/playlist', playlist: playlist
  end

  json.song do
    json.partial! 'api/songs/song', song: song
  end

end
