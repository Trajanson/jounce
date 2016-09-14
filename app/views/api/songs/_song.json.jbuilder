json.song_id               song.id
json.path                  song.path
json.title                 song.title

json.artist_id             song.artist.id
json.artist_name           song.artist.name

json.album_id              song.album.id
json.album_title           song.album.title
json.star_rating           SongRating.get_rating_by_user_and_song(current_user, song)

json.duration              song.duration
json.is_followed           song.is_followed_by?(current_user)

json.album_cover_path      song.album.album_cover_path
