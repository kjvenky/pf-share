class TripsController < ApplicationController
  respond_to :json #Only repond format will be JSON

	def index
		@trips = Trip.all
	end

	def show
	end

	def create
	end

	def destroy
	end

end
