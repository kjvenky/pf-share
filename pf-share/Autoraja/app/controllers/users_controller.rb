class UsersController < ApplicationController
	respond_to :json #Only repond format will be JSON
	
  	def index 
  		# Show all the users
  		@users = User.includes(:profile,:address).all
  	end

  	def show
		  # Show invidividial user details based on the id
		  @user = User.includes(:profile,:address).find(params[:id])
  	end

    def show_by_number
      @user = User.includes(:profile,:address).find_by(:phonenumber => params[:number])
    end
    
    def show_by_name
      @user = User.includes(:profile,:address).find_by(:username => params[:name])
    end

    def show_by_email
      @user = User.includes(:profile,:address).find_by(:email => params[:email])
    end

  	def create
  		# Create a new user
      repond_with(@user)
  	end

  	def update
  		
  	end

  	def destroy
  		
  	end

  	private
  	# Assignmet of accessible params
  	def user_params
  		params.require(:user).permit(:username, :email, :password, :password_confirmation, :remember_me)
  	end

end
