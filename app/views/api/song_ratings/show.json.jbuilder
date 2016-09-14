json.song_rating do
  json.id         @song_rating.id
  json.user_id    @song_rating.user_id
  json.song_id    @song_rating.song_id
  json.rating     @song_rating.rating

  json.created_at @song_rating.created_at
  json.updated_at @song_rating.updated_at
end
