OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.production?
    # provider :facebook, 'YOUR-APP-ID-HERE', 'YOUR-APP-SECRET-HERE'
    provider :facebook, ENV['FACEBOOK_OAUTH_APP_ID_PRODUCTION'],  ENV['FACEBOOK_OAUTH_APP_SECRET_PRODUCTION']
  else
    # provider :facebook, 'YOUR-APP-ID-HERE', 'YOUR-APP-SECRET-HERE'
    provider :facebook, ENV['FACEBOOK_OAUTH_APP_ID_DEVELOPMENT'],  ENV['FACEBOOK_OAUTH_APP_SECRET_DEVELOPMENT']
  end
end
