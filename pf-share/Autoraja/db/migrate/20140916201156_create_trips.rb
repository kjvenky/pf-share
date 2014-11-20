class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.string :trip_reference
      t.integer :user_id
      t.integer :driver_id
      t.integer :cre_id
      t.integer :from_address_id
      t.integer :to_address_id
      t.datetime :triptime
      t.datetime :trip_conf_time
      t.integer :trip_type_id
      t.integer :adults
      t.integer :children
      t.integer :source_id
      t.integer :current_status_id

      t.timestamps
    end
  end
end
