class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :ref_id
      t.text :ref_type
      t.integer :value

      t.timestamps
    end
  end
end
