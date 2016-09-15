json.artist_like do
  json.id           @artist_like.id
  json.user_id      @artist_like.user_id
  json.artist_id    @artist_like.artist_id

  json.created_at   @artist_like.created_at
  json.updated_at   @artist_like.updated_at
end
