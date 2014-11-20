class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.text :firstname
      t.text :lastname
      t.references :user, index: true

      t.timestamps
    end
  end
end
