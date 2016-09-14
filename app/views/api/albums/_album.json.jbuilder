json.album_id         album.id
json.album_title      album.title

json.artist_id        album.artist_id
json.artist_name      Artist.find(album.artist_id).name

json.created_at       album.created_at
json.updated_at       album.updated_at


json.album_cover_path album.album_cover_path

json.is_followed      album.is_liked_by_user?(current_user.id)
