class MusicRadiosController < ApplicationController
  include RadioAlgorithms

  before_action :redirect_to_landing_page_unless_logged_in, only: [:dashboard]

  def dashboard
    @initial_songs_for_radio = get_songs_for_radio
    @information_on_group_of_initial_song_list = {
      type: "Radio",
      radio_station_name: "Jounce Music Radio",
      radio_id: 1
    }
    render layout: "dashboard"
  end

end
