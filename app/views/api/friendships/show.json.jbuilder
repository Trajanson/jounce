if @friendship.friender_id == current_user.id
  friend_id = @friendship.friendee_id
else
  friend_id = @friendship.friender_id
end

friend = User.find(friend_id)

json.friend do
  json.partial! 'api/friendships/friendship', friend: friend
end
