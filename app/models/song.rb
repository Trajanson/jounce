class Song < ActiveRecord::Base
  belongs_to(
    :artist,
    primary_key: :id,
    foreign_key: :artist_id,
    class_name: "Artist"
  )

  belongs_to(
    :album,
    primary_key: :id,
    foreign_key: :album_id,
    class_name: "Album"
  )

  def is_followed_by?(user)
    !SongLike.where({
      user_id: user.id,
      song_id: self.id
    }).empty?
  end



end
