user =                              User.find(playlist.creator_id)

json.type                           "Playlist"
json.playlist_name                  playlist.name

json.id                             playlist.id

json.creator_id                     playlist.creator_id
json.creator_name                   user.username
json.creator_profile_image_url      user.profile_image_url


json.created_at                     playlist.created_at
json.updated_at                     playlist.updated_at
