json.song_likes_info_and_songs do
  json.song_likes_info do
    json.type                       "Playlist"
    json.playlist_name              "#{@creator.username}'s Liked Songs"
    json.is_current_user_like_index true

    json.id                        "Liked Songs"

    json.creator_id                @creator.id
    json.creator_name              @creator.username

    json.creator_profile_image_url @creator.profile_image_url
  end

  json.songs @liked_songs do |song|
    json.partial! 'api/songs/song', song: song
  end
end
