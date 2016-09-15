class ArtistLike < ActiveRecord::Base

  belongs_to(
    :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "User"
  )
  belongs_to(
    :artist,
    primary_key: :id,
    foreign_key: :artist_id,
    class_name: "Artist"
  )


end
