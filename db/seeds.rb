# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
###############################################################################
# USERS #######################################################################
###############################################################################

def randomly_determine_is_premium_status
  random_number = rand(0..1)
  if random_number == 1
    return true
  else
    return false
  end
end

number_of_users = 500 + 1

User.create!([
  {
    username: "Trial User",
    provider: "guest",
    uid: "Bk9p42Z9oKS52A",
    oauth_token: "qX6NXxvnXAwG8g",
    oauth_expires_at: (Time.now + (2*52*7*24*60*60)).to_s,
    is_premium: false
  },
])

(number_of_users - 1).times do |time|
  username = Faker::GameOfThrones.character
  email    = Faker::Internet.safe_email(username)

User.create!([
  {
      username: username,
      provider: "guest",
      uid: "Bk9p42Z9oKS52A",
      oauth_token: "qX6NXxvnXAwG8g",
      oauth_expires_at: (Time.now + (2*52*7*24*60*60)).to_s,
      profile_image_url: Faker::Avatar.image,
      is_premium: randomly_determine_is_premium_status,
      email: email
    },
  ])
end

def random_user_id
  (1..User.count).to_a.sample
end


###############################################################################
# Artists #####################################################################
###############################################################################


Artist.create!([
    {
      name: "Taylor Swift",
      artist_image_path: "https://s3.amazonaws.com/jounce-music-player-storage/artist_photos/taylor_swift.jpg"
    },
    {
      name: "Ellie Goulding",
      artist_image_path: "https://s3.amazonaws.com/jounce-music-player-storage/artist_photos/ellie_goulding.jpg"
    },
    {
      name: "Calvin Harris",
      artist_image_path: "https://s3.amazonaws.com/jounce-music-player-storage/artist_photos/calvin_harris.jpg"
    },
    {
      name: "Coleman Hell",
      artist_image_path: "https://s3.amazonaws.com/jounce-music-player-storage/artist_photos/coleman_hell.jpg"
    },
    {
      name: "Zedd",
      artist_image_path: "https://s3.amazonaws.com/jounce-music-player-storage/artist_photos/zedd.jpg"
    },
    {
      name: "Marcus Schössow",
      artist_image_path: "https://s3.amazonaws.com/jounce-music-player-storage/artist_photos/marcus_scho%CC%88ssow.jpg"
    },
    {
      name: "OWEL",
      artist_image_path: "https://s3.amazonaws.com/jounce-music-player-storage/artist_photos/owel.jpg"
    }
])

def random_artist_id
  (1..Artist.count).to_a.sample
end


###############################################################################
# Albums ######################################################################
###############################################################################

Album.create!([
    {
      title:     "Valentine's Day",
      artist_id: Artist.find_by_name("Taylor Swift").id,
      album_cover_path: 'https://s3.amazonaws.com/jounce-music-player-storage/album+covers/ValentinesDay.jpg'
    },
    {
      title:     "Halycon Days",
      artist_id: Artist.find_by_name("Ellie Goulding").id,
      album_cover_path: 'https://s3.amazonaws.com/jounce-music-player-storage/album+covers/HalcyonDays.png'
    },
    {
      title:     "18 Months",
      artist_id: Artist.find_by_name("Calvin Harris").id,
      album_cover_path: 'https://s3.amazonaws.com/jounce-music-player-storage/album+covers/18Months.jpg'
    },
    {
      title:     "Fireproof",
      artist_id: Artist.find_by_name("Coleman Hell").id,
      album_cover_path: 'https://s3.amazonaws.com/jounce-music-player-storage/album+covers/Fireproof.jpg'
    },
    {
      title:     "True Colors",
      artist_id: Artist.find_by_name("Zedd").id,
      album_cover_path: 'https://s3.amazonaws.com/jounce-music-player-storage/album+covers/Zedd.jpg'
    },
    {
      title:     "Lionheart",
      artist_id: Artist.find_by_name("Marcus Schössow").id,
      album_cover_path: 'https://s3.amazonaws.com/jounce-music-player-storage/album+covers/Lionheart.jpg'
    },
    {
      title:     "Scales",
      artist_id: Artist.find_by_name("OWEL").id,
      album_cover_path: 'https://s3.amazonaws.com/jounce-music-player-storage/album+covers/Scales.jpg'
    }
])

def random_album_id
  (1..Album.count).to_a.sample
end


###############################################################################
# Playlists ###################################################################
###############################################################################


1000.times do |time|
  name = Faker::App.name
  Playlist.create!([
      {
        name:       name,
        creator_id: random_user_id
      }
  ])
end

def random_playlist_id
  (1..Playlist.count).to_a.sample
end


###############################################################################
# Songs #######################################################################
###############################################################################


Song.create!([
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/GoodnessGracious.mp3",
      title:     "Goodness Gracious",
      artist_id: Artist.find_by_name("Ellie Goulding").id,
      album_id:  Album.find_by_title("Halycon Days").id,
      duration:  233
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/TodayWasAFairytale.mp3",
      title:     "Today Was a Fairytale",
      artist_id: Artist.find_by_name("Taylor Swift").id,
      album_id:  Album.find_by_title("Valentine's Day").id,
      duration:  246
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/AnythingCouldHappen.mp3",
      title:     "Anything Could Happen",
      artist_id: Artist.find_by_name("Ellie Goulding").id,
      album_id:  Album.find_by_title("Halycon Days").id,
      duration:  231
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/Lights.mp3",
      title:     "Lights",
      artist_id: Artist.find_by_name("Ellie Goulding").id,
      album_id:  Album.find_by_title("Halycon Days").id,
      duration:  220
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/Burn.mp3",
      title:     "Burn",
      artist_id: Artist.find_by_name("Ellie Goulding").id,
      album_id:  Album.find_by_title("Halycon Days").id,
      duration:  234
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/HowLongWillILoveYou.mp3",
      title:     "How Long Will I Love You",
      artist_id: Artist.find_by_name("Ellie Goulding").id,
      album_id:  Album.find_by_title("Halycon Days").id,
      duration:  158
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/INeedYourLove.wmv.mp3",
      title:     "I Need Your Love",
      artist_id: Artist.find_by_name("Calvin Harris").id,
      album_id:  Album.find_by_title("18 Months").id,
      duration:  234
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/Fireproof.mp3",
      title:     "Fireproof",
      artist_id: Artist.find_by_name("Coleman Hell").id,
      album_id:  Album.find_by_title("Fireproof").id,
      duration:  173
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/TrueColors.mp3",
      title:     "True Colors",
      artist_id: Artist.find_by_name("Zedd").id,
      album_id:  Album.find_by_title("True Colors").id,
      duration:  225
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/Lionheart.mp3",
      title:     "Lionheart",
      artist_id: Artist.find_by_name("Marcus Schössow").id,
      album_id:  Album.find_by_title("Lionheart").id,
      duration:  191
    },
    {
      path:      "https://s3.amazonaws.com/jounce-music-player-storage/songs/Scales.mp3",
      title:     "Scales",
      artist_id: Artist.find_by_name("OWEL").id,
      album_id:  Album.find_by_title("Scales").id,
      duration:  232
    }
])

def random_song_id
  (1..Song.count).to_a.sample
end


##############################################################################
# SongLikes ###################################################################
##############################################################################


5000.times do |time|
  user_id = random_user_id
  song_id = random_song_id

  previous_song_like = SongLike.find_by({
      user_id: user_id,
      song_id: song_id
  })

  if previous_song_like.nil?
    SongLike.create!([
      {
        user_id: user_id,
        song_id: song_id
      }
    ])
  end

end


###############################################################################
# SongRatings #################################################################
###############################################################################

def random_song_rating
  (0..4).to_a.sample
end



5000.times do |time|
  user_id     = random_user_id
  song_id     = random_song_id
  song_rating = random_song_rating

  previous_song_rating = SongRating.find_by({
      user_id: user_id,
      song_id: song_id
  })

  if previous_song_rating.nil?
    SongRating.create!([
      {
        user_id: user_id,
        song_id: song_id,
        rating: song_rating
      }
    ])
  end

end



###############################################################################
# AlbumLikes ##################################################################
###############################################################################


5000.times do |time|
  user_id  = random_user_id
  album_id = random_album_id

  previous_album_like = AlbumLike.find_by({
      user_id:  user_id,
      album_id: album_id
  })

  if previous_album_like.nil?
    AlbumLike.create!([
      {
        user_id:  user_id,
        album_id: album_id
      }
    ])
  end

end

###############################################################################
# ArtistLikes #################################################################
###############################################################################


5000.times do |time|
  user_id  = random_user_id
  artist_id = random_artist_id

  previous_artist_like = ArtistLike.find_by({
      user_id:  user_id,
      artist_id: artist_id
  })

  if previous_artist_like.nil?
    ArtistLike.create!([
      {
        user_id:  user_id,
        artist_id: artist_id
      }
    ])
  end

end

###############################################################################
# PlaylistLikes ###############################################################
###############################################################################


5000.times do |time|
  user_id     = random_user_id
  playlist_id = random_playlist_id

  previous_playlist_like = PlaylistLike.find_by({
      user_id:  user_id,
      playlist_id: playlist_id
  })

  if previous_playlist_like.nil?
    PlaylistLike.create!([
      {
        user_id:     user_id,
        playlist_id: playlist_id
      }
    ])
  end

end

###############################################################################
# PlaylistSongs ###############################################################
###############################################################################


5000.times do |time|
  playlist_id = random_playlist_id
  song_id     = random_song_id


  PlaylistSong.create!([
    {
      playlist_id:     playlist_id,
      song_id:         song_id
    }
  ])

end

###############################################################################
# SongsPlays ###############################################################
###############################################################################


10_000.times do |time|
  user_id     = random_user_id
  song_id     = random_song_id

  SongPlay.create!([
    {
      user_id:     user_id,
      song_id:     song_id
    }
  ])

end


###############################################################################
# Friendships ###############################################################
###############################################################################


5000.times do |time|
  friender_id     = random_user_id
  friendee_id     = random_user_id

  previous_friender_friend = Friendship.find_by({
      friender_id:  friender_id,
      friendee_id:  friendee_id
  })

  # swap users to see if one was friended by the other
  previous_friendee_friend = Friendship.find_by({
      friender_id:  friendee_id,
      friendee_id:  friender_id
  })


  if previous_friender_friend.nil? && previous_friendee_friend.nil?
    Friendship.create!([
      {
        friender_id:  friender_id,
        friendee_id:  friendee_id
      }
    ])
  end

end
