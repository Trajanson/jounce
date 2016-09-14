class Api::FriendshipsController < ApplicationController

  def social_content
    @friends = current_user.friends

    number_of_friends_to_suggest = 5

    @suggested_friends = current_user.suggest_friends(number_of_friends_to_suggest)

    render 'api/friendships/social_content'
  end


  def create
		friender_id = current_user.id
    friendee_id = friendship_params["friend_id"].to_i
		@friendship = Friendship.new(friender_id: friender_id, friendee_id: friendee_id)


		if @friendship.save
			render "api/friendships/show"
		else
			render(
        json: ["Server error. User was not followed."],
        status: 404
      )
		end

  end

  def destroy
		@friendship = Friendship.find_by(
                friender_id: current_user.id,
                friendee_id: friendship_params["friend_id"].to_i
              )
    if @friendship.destroy
      render 'api/friendships/show'
    else
      @friendship = Friendship.find_by(
                  friender_id:  friendship_params["friend_id"].to_i,
                  friendee_id: current_user.id
                )
      if @friendship.destroy
        render 'api/friendships/show'
      else
        render(
        json: ["Server error. Album was not unfollowed."],
        status: 404
        )
      end
    end

  end

private
  def friendship_params
    params.require(:friendship).permit(:friend_id)
  end


end
