class SongRating < ActiveRecord::Base

  def self.get_rating_by_user_and_song(user, song)
    song_rating = SongRating.find_by( user_id: user.id,
                                    song_id: song.id
                                  )
    if song_rating
      return song_rating.rating
    else
      return 0
    end
  end


end
