json.playlist do
  json.id              @playlist.id
  json.creator_id      @playlist.creator_id
  json.name            @playlist.name

  json.created_at @playlist.created_at
  json.updated_at @playlist.updated_at
end
