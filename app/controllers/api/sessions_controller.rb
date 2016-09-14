class Api::SessionsController < ApplicationController

	def destroy
		@user = current_user

		if @user
			logout
			render "api/users/show"
		else
			render(
        json: ["The Current User is Not Signed In. Please try refreshing the page."],
        status: 404
      )
		end

  end


end
