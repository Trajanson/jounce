class Api::PlaylistSongsController < ApplicationController

	def create
		user_id = current_user.id
		playlist_id = playlist_like_params["playlist_id"].to_i
		song_id = playlist_like_params["song_id"].to_i

    playlist = Playlist.find(playlist_id)

    # requestor is playlist owner
    if playlist.creator_id == user_id
      @playlist_song = PlaylistSong.new(song_id: song_id,
                                        playlist_id: playlist_id
                                       )
      if @playlist_song.save
        render "api/playlist_songs/show"
      else
        render(
          json: ["Server error. Song was not added to playlist."],
          status: 404
        )
      end
    else
      render(
        json: ["Server error. User may only add songs to their own playlists."],
        status: 404
      )
    end
  end

  def destroy
    user_id = current_user.id
		playlist_id = playlist_like_params["playlist_id"].to_i
		song_id = playlist_like_params["song_id"].to_i

    playlist = Playlist.find(playlist_id)

    # requestor is playlist owner
    if playlist.creator_id == user_id
      @playlist_song = PlaylistSong.find_by(song_id: song_id,
                                        playlist_id: playlist_id
                                       )
      if @playlist_song.destroy
        render "api/playlist_songs/show"
      else
        render(
          json: ["Server error. Song was not removed from the playlist."],
          status: 404
        )
      end
    else
      render(
        json: ["Server error. User may only delete songs from their own playlists."],
        status: 404
      )
    end
  end

private

  def playlist_like_params
    params.require(:playlist_song).permit(:song_id, :playlist_id)
  end

end
