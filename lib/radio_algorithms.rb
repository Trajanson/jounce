module RadioAlgorithms


  def get_songs_for_radio
    current_user

    randomly_take_next_(10)
  end

private

  def randomly_take_next_(quantity)
    Song.order("RANDOM()").limit(quantity)
  end


end
