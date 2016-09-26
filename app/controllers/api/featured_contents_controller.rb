class Api::FeaturedContentsController < ApplicationController

  def retrieve
    @announcements = "Checkout this featured content"
    @albums        =  Album.order("RANDOM()").limit(3)
    @artists       =  Artist.order("RANDOM()").limit(3)
    @playlists     =  Playlist.order("RANDOM()").limit(3)



    render "api/featured_contents/index"
  end

end
