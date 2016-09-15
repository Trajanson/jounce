class Artist < ActiveRecord::Base

  has_many(
    :songs,
    primary_key: :id,
    foreign_key: :album_id,
    class_name: "Song"
  )


  def is_liked_by_user?(user_id)
    !!ArtistLike.find_by({
      user_id:   user_id,
      artist_id: self.id
      })
  end


end
