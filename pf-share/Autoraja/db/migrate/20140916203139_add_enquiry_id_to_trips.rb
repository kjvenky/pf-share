class AddEnquiryIdToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :enquiry_type, :integer
  end
end
