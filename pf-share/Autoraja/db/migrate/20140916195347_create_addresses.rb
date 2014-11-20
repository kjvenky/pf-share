class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.text :info
      t.integer :pincode
      t.string :landmark

      t.timestamps
    end
  end
end
