json.album_like do
  json.id         @album_like.id
  json.user_id    @album_like.user_id
  json.album_id    @album_like.album_id

  json.created_at @album_like.created_at
  json.updated_at @album_like.updated_at
end
