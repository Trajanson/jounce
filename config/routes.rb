Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # MUSIC RADIO DASHBOARD
  root                             to: "music_radios#dashboard"
  get '/',                         to: 'music_radios#dashboard',  as: 'dashboard'


  # LANDING PAGE FOR NEW USERS
  get '/get',                      to: 'static_pages#landing',    as: 'landing'

  # Login Page
  get '/start-your-jounce',        to: 'static_pages#login_page', as: 'login_page'


  # PREMIUM STATUS

  # SECURE PAYMENT PAGE
  get '/secure_pay',               to: 'static_pages#secure_pay', as: 'secure_pay'

  # SUCCESSFUL PAYMENT
  get 'register_premium',          to: 'static_pages#register_premium', as: 'register_premium'

  # UNSUBSCRIBE
  get 'unsubscribe_from_premium',  to: 'static_pages#unsubscribe_from_premium', as: 'unsubscribe_from_premium'


  # USER AUTHENTICATION
  get 'login_as_guest', to: 'sessions#create_guest_session',    via: [:get, :post]
  match 'auth/:provider/callback', to: 'sessions#create',    via: [:get, :post]
  match 'auth/failure',            to: redirect('/landing'), via: [:get, :post]
  match 'signout',                 to: 'sessions#destroy',        as: 'signout', via: [:get, :post]










  namespace :api, defaults: {format: :json} do
    # USER AUTHENTICATION
    resource :session, only: [:destroy]

    # RADIOS
    get 'get_radio_songs',     to: 'radio_songs#retrieveUpcomingSongs', as: 'get_additional_songs_for_radio'

    # PLAYLISTS
    post 'create_playlist',      to: 'playlists#create', as: 'create_playlist'
    get 'view_playlist',     to: 'playlists#show', as: 'playlist_show'

    # PLAYLIST SONGS
    post 'create_playlist_song',      to: 'playlist_songs#create', as: 'create_playlist_song'
    delete 'destroy_playlist_song',   to: 'playlist_songs#destroy', as: 'destroy_playlist_song'


    # SONG LIKES
    post    'create_song_like',             to: 'song_likes#create',  as: 'create_song_like'
    delete 'destroy_song_like',             to: 'song_likes#destroy', as: 'destroy_song_like'
    get 'view_current_user_song_likes',     to: 'song_likes#show',    as: 'current_user_song_likes_index'


    # SONG RATINGS
    patch 'set_song_rating',     to: 'song_ratings#update', as: 'declare_song_rating'

    # ALBUM
    get 'view_album',      to: 'albums#show', as: 'album_show'

    # ARTIST
    get 'view_artist',     to: 'artists#show', as: 'artist_show'

    # ALBUM LIKES
    get 'followed_albums_for_current_user',     to: 'album_likes#index', as: 'get_followed_albums'
    post    'create_album_like',  to: 'album_likes#create', as: 'create_album_like'
    delete 'destroy_album_like',  to: 'album_likes#destroy', as: 'destroy_album_like'

    # ARTIST LIKES
    get 'followed_artists_for_current_user',     to: 'artist_likes#index', as: 'get_followed_artists'
    post    'create_artist_like',   to: 'artist_likes#create',  as: 'create_artist_like'
    delete  'destroy_artist_like',  to: 'artist_likes#destroy', as: 'destroy_artist_like'

    # FRIENDSHIPS
    post    'create_friendship',             to: 'friendships#create',  as: 'create_friendship'
    delete 'destroy_friendship',             to: 'friendships#destroy', as: 'destroy_friendship'


    # SOCIAL CONTENT
    get 'social_content',     to: 'friendships#social_content', as: 'social_content'

    # SEARCH RESULTS
    get 'search_results',     to: 'search_results#retrieve',    as: 'get_search_results'

    # FEATURED CONTENT
    get 'featured_content',   to: 'featured_contents#retrieve', as: 'get_featured_content'

  end

end
