class Trip < ActiveRecord::Base
	has_and_belongs_to_many :user
	has_one :status
end
