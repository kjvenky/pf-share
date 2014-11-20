class AddActualDistanceToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :actual_distance, :integer
  end
end
