json.artist_id         artist.id
json.artist_name       artist.name

json.created_at        artist.created_at
json.updated_at        artist.updated_at


json.artist_image_path artist.artist_image_path

json.is_followed       artist.is_liked_by_user?(current_user.id)
