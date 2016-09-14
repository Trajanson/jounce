class PlaylistSong < ActiveRecord::Base

  belongs_to(
    :playlist,
    primary_key: :id,
    foreign_key: :playlist_id,
    class_name: "Playlist"
  )

  belongs_to(
    :song,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: "Song"
  )
end
