class Api::RadioSongsController < ApplicationController
  include RadioAlgorithms

  def retrieveUpcomingSongs
    @songs = get_songs_for_radio
    render "api/radio_songs/index"
  end
end
