class Api::SongRatingsController < ApplicationController

	def update
    user_id = current_user.id
    song_id = song_rating_params["song_id"].to_i
    rating =  song_rating_params["rating"].to_i
    @song_rating = SongRating.find_by( user_id: user_id,
                                    song_id: song_id
                                  )

    if @song_rating && @song_rating.update(rating: rating)
      render "api/song_ratings/show"
    else
			@song_rating = SongRating.new
			@song_rating.user_id = user_id
			@song_rating.song_id = song_id
			@song_rating.rating  = rating
			if @song_rating.save
				render "api/song_ratings/show"
			else
				render(
				json: ["Rating for Song Failed to Update"],
				status: 404
				)
			end
    end

  end

private

  def song_rating_params
    params.require(:song_rating).permit(:song_id, :rating)
  end

end
