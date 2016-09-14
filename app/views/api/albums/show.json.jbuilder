json.album_info_and_songs do
  json.album_info do
    json.partial! 'api/albums/album', album: @album
    json.type     "Album"
  end

  json.songs @album.songs do |song|
    json.partial! 'api/songs/song', song: song
  end
end
