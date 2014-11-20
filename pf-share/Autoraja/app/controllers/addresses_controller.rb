class AddressesController < ApplicationController
  respond_to :json	
	def index
		@addresses = Address.all
	end

end
