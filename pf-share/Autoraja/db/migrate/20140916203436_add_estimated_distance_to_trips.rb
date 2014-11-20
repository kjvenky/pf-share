class AddEstimatedDistanceToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :estimated_distance, :integer
  end
end
