class Api::AlbumLikesController < ApplicationController

  def index
    @albums = current_user.liked_albums
    render 'api/albums/index'
  end


  def create
		user_id = current_user.id
		album_id = album_like_params["album_id"].to_i
		@album_like = AlbumLike.new(user_id: user_id, album_id: album_id)


		if @album_like.save
			render "api/album_likes/show"
		else
			render(
        json: ["Server error. Album was not followed."],
        status: 404
      )
		end

  end

  def destroy
		@album_like = AlbumLike.find_by(
                user_id: current_user.id,
                album_id: album_like_params["album_id"].to_i
              )
    if @album_like.destroy
      render 'api/album_likes/show'
    else
      render(
        json: ["Server error. Album was not unfollowed."],
        status: 404
      )
    end

  end




private
  def album_like_params
    params.require(:album_like).permit(:album_id)
  end

end
