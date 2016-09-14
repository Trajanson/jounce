class Album < ActiveRecord::Base

  belongs_to(
    :artist,
    primary_key: :id,
    foreign_key: :artist_id,
    class_name: "Artist"
  )

  has_many(
    :songs,
    primary_key: :id,
    foreign_key: :album_id,
    class_name: "Song"
  )


  def is_liked_by_user?(user_id)
    !!AlbumLike.find_by({
      user_id: user_id,
      album_id: self.id
      })
  end


end
