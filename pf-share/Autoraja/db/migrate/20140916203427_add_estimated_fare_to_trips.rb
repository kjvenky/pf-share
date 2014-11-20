class AddEstimatedFareToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :estimated_fare, :integer
  end
end
