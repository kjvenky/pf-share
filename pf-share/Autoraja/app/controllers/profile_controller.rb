class ProfileController < ApplicationController
	def index
		
	end

	private
	def profile_params
		params.require(:profile).permit(:first_name,:last_name)
	end	

end
