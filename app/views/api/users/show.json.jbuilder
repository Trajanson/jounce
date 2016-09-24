json.user do
  json.partial! 'api/friendships/friendship', user: @user
end
