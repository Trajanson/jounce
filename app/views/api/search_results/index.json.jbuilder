json.search_results do
  json.users @users do |user|
    json.partial! 'api/users/user', user: user
  end

  json.albums @albums   do |album|
    json.partial! 'api/albums/album', album: album
  end

  json.artists @artists do |artist|
    json.partial! 'api/artists/artist', artist: artist
  end

  json.playlists @playlists do |playlist|
    json.partial! 'api/playlists/playlist', playlist: playlist
  end


  json.songs_info_and_songs do
    json.songs_info do
      json.type           "Search Results"
      json.playlist_name  "Search Results"
    end

    json.songs @songs do |song|
      json.partial! 'api/songs/song', song: song
    end
  end

end
