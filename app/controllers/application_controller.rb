class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?


  def current_user
    if session[:user_id]
      @current_user ||= User.find_by({uid: session[:user_id]})
    else
      return nil
    end
  end

  def logged_in?
    !!current_user
  end

  def log_in(user)
    @current_user = user
    session[:user_id] = user.uid
  end

  def log_in_as_guest_user
    current_user = User.first
    session[:user_id] = current_user.uid
  end



  def logout
    current_user.try(:expire_oauth_token)
    session[:user_id] = nil
  end

  def redirect_to_landing_page_unless_logged_in
    redirect_to landing_url unless logged_in?
  end

  def redirect_to_music_player_dashboard_if_already_logged_in
    redirect_to dashboard_url if logged_in?
  end

  def redirect_to_login_page_unless_logged_in
    redirect_to login_page_url unless logged_in?
  end

end
