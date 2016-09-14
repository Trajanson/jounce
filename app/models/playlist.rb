class Playlist < ActiveRecord::Base

  belongs_to(
    :user,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: "User"
  )

  has_many(
    :playlist_songs,
    primary_key: :id,
    foreign_key: :playlist_id,
    class_name: "PlaylistSong"
  )

  has_many(
    :songs,
    through: :playlist_songs,
    source: :song
  )

  has_many(
    :playlist_likes,
    primary_key: :id,
    foreign_key: :playlist_id,
    class_name: "PlaylistLike"
  )


end
