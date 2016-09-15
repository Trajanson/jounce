class Api::ArtistsController < ApplicationController

  def show
    artist_id = artist_params["id"].to_i
    @artist = Artist.find(artist_id)
    render 'api/artists/show'
  end

private

  def artist_params
    params.require(:artist).permit(:id)
  end

end
