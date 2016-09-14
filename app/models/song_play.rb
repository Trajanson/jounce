class SongPlay < ActiveRecord::Base
  belongs_to(
    :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "User"
  )

  belongs_to(
  :song,
  primary_key: :id,
  foreign_key: :song_id,
  class_name: "Song"
)

  delegate :artist, :to => :song, :allow_nil => true
  delegate :album, :to => :song, :allow_nil => true


end
