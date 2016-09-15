json.artist_info_and_songs do
  json.artist_info do
    json.partial! 'api/artists/artist', artist: @artist
    json.type     "Artist"
  end

  json.songs @artist.songs do |song|
    json.partial! 'api/songs/song', song: song
  end
end
