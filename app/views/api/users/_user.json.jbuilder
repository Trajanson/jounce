information_on_last_song_listened_to =        user.information_on_last_song_listened_to
json.id                                       user.id
json.username                                 user.username
json.profile_image_url                        user.profile_image_url
json.email                                    user.email

json.is_a_friend_of_current_user              user.is_a_friend_of?(current_user)

json.id_of_last_song_listened_to              information_on_last_song_listened_to[:song_id]
json.title_of_last_song_listened_to           information_on_last_song_listened_to[:song_title]

json.id_of_album_of_last_song_listened_to     information_on_last_song_listened_to[:album_id]
json.title_of_album_of_last_song_listened_to  information_on_last_song_listened_to[:album_title]

json.id_of_artist_of_last_song_listened_to    information_on_last_song_listened_to[:artist_id]
json.name_of_artist_of_last_song_listened_to  information_on_last_song_listened_to[:artist_name]
