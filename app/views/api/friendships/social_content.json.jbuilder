json.social_content do
  json.friends @friends do |friend|
    json.partial! 'api/friendships/friendship', friend: friend
  end

  json.suggested_friends @suggested_friends do |friend|
    json.partial! 'api/friendships/friendship', friend: friend
  end
end
