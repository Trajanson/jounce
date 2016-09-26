class SessionsController < ApplicationController

  helper_method :current_user, :logged_in?

  def create
    user = User.from_omniauth(env["omniauth.auth"])

    if user.oauth_expires_at < Time.now
      user.expire_oauth_token
      redirect_to landing_url
    else
      log_in(user)
      redirect_to root_url
    end
  end

  def create_guest_session
    log_in_as_guest_user
    redirect_to root_url
  end

  def destroy
    logout
    redirect_to landing_url
  end
end
