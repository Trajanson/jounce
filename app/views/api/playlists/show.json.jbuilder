json.playlist_info_and_songs do
  json.playlist_info do
    json.partial! 'api/playlists/playlist', playlist: @playlist
  end

  json.songs @playlist.songs do |song|
    json.partial! 'api/songs/song', song: song
  end
end
