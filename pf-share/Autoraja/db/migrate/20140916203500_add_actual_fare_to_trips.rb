class AddActualFareToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :actual_fare, :integer
  end
end
