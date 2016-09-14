class StaticPagesController < ApplicationController
  before_action :redirect_to_login_page_unless_logged_in, only: [:secure_pay, :register_premium]
  before_action :redirect_to_music_player_dashboard_if_already_logged_in, only: [:login_page]


  def landing
    render layout: "landing"
  end

  def secure_pay
    render layout: "secure_pay"
  end

  def login_page
    render :login, layout: false
  end

  def register_premium
    @user = current_user
    @user.is_premium = true
    @user.save
    redirect_to dashboard_url
  end

  def unsubscribe_from_premium
    @user = current_user
    @user.is_premium = false
    @user.save
    redirect_to landing_url
  end

end
