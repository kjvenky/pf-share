class CreateTripCancelStatuses < ActiveRecord::Migration
  def change
    create_table :trip_cancel_statuses do |t|
      t.string :name

      t.timestamps
    end
  end
end
