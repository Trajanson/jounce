class Api::ArtistLikesController < ApplicationController

  def index
    @artists = current_user.liked_artists
    render 'api/artists/index'
  end


  def create
		user_id = current_user.id
		artist_id = artist_like_params["artist_id"].to_i
		@artist_like = ArtistLike.new(user_id: user_id, artist_id: artist_id)


		if @artist_like.save
			render "api/artist_likes/show"
		else
			render(
        json: ["Server error. Artist was not followed."],
        status: 404
      )
		end

  end

  def destroy
		@artist_like = ArtistLike.find_by(
                user_id: current_user.id,
                artist_id: artist_like_params["artist_id"].to_i
              )
    if @artist_like.destroy
      render 'api/artist_likes/show'
    else
      render(
        json: ["Server error. Artist was not unfollowed."],
        status: 404
      )
    end

  end




private
  def artist_like_params
    params.require(:artist_like).permit(:artist_id)
  end

end
