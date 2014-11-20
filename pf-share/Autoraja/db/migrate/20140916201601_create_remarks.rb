class CreateRemarks < ActiveRecord::Migration
  def change
    create_table :remarks do |t|
      t.integer :remarks_type
      t.integer :ref_id
      t.text :text

      t.timestamps
    end
  end
end
