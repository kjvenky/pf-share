class CreateRemarksTypes < ActiveRecord::Migration
  def change
    create_table :remarks_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
