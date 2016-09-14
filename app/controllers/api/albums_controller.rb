class Api::AlbumsController < ApplicationController

  def show
    album_id = album_params["id"].to_i
    @album = Album.find(album_id)
    render 'api/albums/show'
  end

private

  def album_params
    params.require(:album).permit(:id)
  end

end
