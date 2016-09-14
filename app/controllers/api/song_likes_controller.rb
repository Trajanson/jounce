class Api::SongLikesController < ApplicationController

	def create
		user_id = current_user.id
		song_id = song_like_params["song_id"].to_i
		@song_like = SongLike.new(user_id: user_id, song_id: song_id)


		if @song_like.save
			render "api/song_likes/show"
		else
			render(
        json: ["Server error. Song was not followed."],
        status: 404
      )
		end

  end

  def destroy
		@song_like = SongLike.find_by(
                user_id: current_user.id,
                song_id: song_like_params["song_id"].to_i
              )
    if @song_like.destroy
      render 'api/song_likes/show'
    else
      render(
        json: ["Server error. Song was not unfollowed."],
        status: 404
      )
    end
  end

	def show
		@creator = current_user
		@liked_songs = current_user.liked_songs

		render 'api/song_likes/index'
	end


private

  def song_like_params
    params.require(:song_like).permit(:song_id)
  end

end
