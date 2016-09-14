json.radio_station_info_and_songs do
  json.radio_station_info do
    json.type                   "Radio"
    json.radio_station_name     "Jounce Music Radio"
    json.radio_id               "1"
  end

  json.songs @songs do |song|
    json.partial! 'api/songs/song', song: song
  end
end
