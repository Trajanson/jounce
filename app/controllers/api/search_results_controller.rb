class Api::SearchResultsController < ApplicationController

	def retrieve
    search_term = search_params["search_request"].downcase

    @users = User.where(
      "LOWER(username) LIKE ? OR LOWER(email) LIKE ?",
      "%#{search_term}%",
      "%#{search_term}%"
    )

    @albums = Album.where(
      "LOWER(title) LIKE ?",
      "%#{search_term}%"
    )

    @artists = Artist.where(
      "LOWER(name) LIKE ?",
      "%#{search_term}%"
    )

    @playlists = Playlist.where(
      "LOWER(name) LIKE ?",
      "%#{search_term}%"
    )

    @songs = Song.where(
      "LOWER(title) LIKE ?",
      "%#{search_term}%"
    )

    render "api/search_results/index"
  end

private
  def search_params
    params.require(:search_request).permit(:search_request)
  end

end
