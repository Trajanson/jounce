json.song_like do
  json.id         @song_like.id
  json.user_id    @song_like.user_id
  json.song_id    @song_like.song_id

  json.created_at @song_like.created_at
  json.updated_at @song_like.updated_at
end
