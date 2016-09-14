class AlbumLike < ActiveRecord::Base

  belongs_to(
    :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "User"
  )
  belongs_to(
    :album,
    primary_key: :id,
    foreign_key: :album_id,
    class_name: "Album"
  )


end
