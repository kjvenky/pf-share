class CreateSms < ActiveRecord::Migration
  def change
    create_table :sms do |t|
      t.text :text
      t.text :sms_status
      t.text :remark

      t.timestamps
    end
  end
end
