information_on_last_song_listened_to =        friend.information_on_last_song_listened_to
json.id                                       friend.id
json.username                                 friend.username
json.profile_image_url                        friend.profile_image_url
json.email                                    friend.email

json.is_a_friend_of_current_user              friend.is_a_friend_of?(current_user)

json.id_of_last_song_listened_to              information_on_last_song_listened_to[:song_id]
json.title_of_last_song_listened_to           information_on_last_song_listened_to[:song_title]

json.id_of_album_of_last_song_listened_to     information_on_last_song_listened_to[:album_id]
json.title_of_album_of_last_song_listened_to  information_on_last_song_listened_to[:album_title]

json.id_of_artist_of_last_song_listened_to    information_on_last_song_listened_to[:artist_id]
json.name_of_artist_of_last_song_listened_to  information_on_last_song_listened_to[:artist_name]
