class User < ActiveRecord::Base

  has_many(
    :album_likes,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "AlbumLike"
  )

  has_many(
    :liked_albums,
    through: :album_likes,
    source: :album
  )

  has_many(
    :artist_likes,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "ArtistLike"
  )

  has_many(
    :liked_artists,
    through: :artist_likes,
    source: :artist
  )

  has_many(
    :playlist_likes,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "PlaylistLike"
  )

  has_many(
    :liked_playlists,
    through: :playlist_likes,
    source: :playlist
  )


  has_many(
    :song_likes,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "SongLike"
  )

  has_many(
    :liked_songs,
    through: :song_likes,
    source: :song
  )




  has_many(
    :playlists,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: "Playlist"
  )

  has_many(
    :friendships_as_friender,
    primary_key: :id,
    foreign_key: :friender_id,
    class_name: "Friendship"
  )

  has_many(
    :friendships_as_friendee,
    primary_key: :id,
    foreign_key: :friendee_id,
    class_name: "Friendship"
  )

  has_many(
    :friends_self_initiated,
    through: :friendships_as_friender,
    source: :friendee
  )

  has_many(
    :friends_received_passively,
    through: :friendships_as_friendee,
    source: :friender
  )

  def friends
    self.friends_self_initiated +
    self.friends_received_passively
  end

  def is_a_friend_of?(friend)
    self.friends.include?(friend)
  end


  def information_on_last_song_listened_to
    songPlay = SongPlay.includes(:song).order(:updated_at).reverse_order.find_by({
      user_id: self.id
    })

    return {
      song_id:     songPlay.song.id,
      song_title:  songPlay.song.title,

      album_id:    songPlay.album.id,
      album_title: songPlay.album.title,

      artist_id:   songPlay.artist.id,
      artist_name: songPlay.artist.name
    }

  end


  def self.from_omniauth(auth)
    auth_hash = {provider: auth.provider, uid: auth.uid }

    where(auth_hash).first_or_initialize.tap do |user|
      user.username          = auth.info.name
      user.provider          = auth.provider
      user.uid               = auth.uid
      user.oauth_token       = auth.credentials.token
      user.oauth_expires_at  = Time.at(auth.credentials.expires_at)

      user.profile_image_url = auth.info.image
      user.email             = auth.info.email

      user.save!
    end
  end

  def expire_oauth_token
    self.oauth_token = SecureRandom.urlsafe_base64(16)
    self.save!
  end




  def suggest_friends(number_of_friends_to_suggest)
    User.where
        .not(id: self.ids_of_friends)
        .order("RANDOM()")
        .take(number_of_friends_to_suggest)
  end


  def ids_of_friends
    self.friends.map do |friend|
      friend.id
    end
  end

end
