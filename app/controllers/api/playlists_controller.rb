class Api::PlaylistsController < ApplicationController

	def create
    @playlist = Playlist.new(creator_id: current_user.id, name: playlist_params["name"])

		if @playlist.save
			render "api/playlists/response"
		else
			render(
        json: ["The current playlist could not be saved."],
        status: 404
      )
		end
  end



	def show
		playlist_id = playlist_params["id"].to_i
		@playlist = Playlist.find(playlist_id)
		render 'api/playlists/show'
	end

private

  def playlist_params
    params.require(:playlist).permit(:name, :id)
  end

end
