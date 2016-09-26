json.featured_contents do
  json.announcements    @announcements

  json.albums @albums   do |album|
    json.partial! 'api/albums/album', album: album
  end

  json.artists @artists do |artist|
    json.partial! 'api/artists/artist', artist: artist
  end

  json.playlists @playlists do |playlist|
    json.partial! 'api/playlists/playlist', playlist: playlist
  end

end
