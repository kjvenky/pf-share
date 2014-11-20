# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User1 seed
User.create username: 'kjvenky', password: 'kjvenky123', phonenumber: '9840942024', email: 'kjvenky@gmail.com'
Profile.create firstname: 'kj', lastname: 'venky', gender: 'MALE', age: '24', user_id: '1'

# User2 seed
User.create username: 'Anubhav', password: 'password', email: 'Anubhav@gmail.com', phonenumber: '9845612378'
Profile.create firstname: 'Anubhav', lastname: 'Agarwal', gender: 'MALE', age: '24', user_id: '2'

# User3 seed
User.create username: 'Aishwarya', password: 'password', email: 'Anubhav12@gmail.com', phonenumber: '9562134578'
Profile.create firstname: 'Aishwarya', lastname: '', gender: 'FEMALE', age: '26', user_id: '3'

# Address1 Seed
Address.create info: '25th Road, 1st loop, Hoste', user_id: '1', pincode: '600036', landmark: 'SAC'
Address.create info: '25th Road, 1st loop, Hoste', user_id: '1', pincode: '600016', landmark: 'Arumbakkam'
Address.create info: '25th Road, 1st loop, Hoste', user_id: '2', pincode: '600116', landmark: 'Adyar'
Address.create info: '25th Road, 1st loop, Hoste', user_id: '2', pincode: '600026', landmark: 'Tambaram'
Address.create info: '25th Road, 1st loop, Hoste', user_id: '2', pincode: '601036', landmark: 'Saidapet'
Address.create info: '25th Road, 1st loop, Hoste', user_id: '3', pincode: '603032', landmark: 'Koyembedu'

# Create a admin user

# Trips seed
# Trip reference
Trip.create trip_reference: 'wow', user_id: '1', driver_id: '2', cre_id: '3', from_address_id: '1', to_address_id: '2', triptime: DateTime.now, trip_conf_time: DateTime.now, trip_type_id: '1', adults: '2', children: '0', source_id: '1', current_status_id: '2', info: 'Special wow', estimated_fare: '2', estimated_distance: '2', actual_distance: '4', actual_fare: '10'
Trip.create trip_reference: 'lolapa', user_id: '1', driver_id: '2', cre_id: '3', from_address_id: '1', to_address_id: '2', triptime: DateTime.now, trip_conf_time: DateTime.now, trip_type_id: '1', adults: '2', children: '0', source_id: '1', current_status_id: '2', info: 'Special wow', estimated_fare: '2', estimated_distance: '2', actual_distance: '4', actual_fare: '10'
Trip.create trip_reference: 'lol', user_id: '1', driver_id: '2', cre_id: '3', from_address_id: '1', to_address_id: '2', triptime: DateTime.now, trip_conf_time: DateTime.now, trip_type_id: '1', adults: '2', children: '0', source_id: '1', current_status_id: '2', info: 'Special wow', estimated_fare: '2', estimated_distance: '2', actual_distance: '4', actual_fare: '10'


# User Role seed
['CUSTOMER','DRIVER','CRE', 'MANAGER', 'ADMIN'].each do |role|
  Role.find_or_create_by({name: role})
end

# Status seed
['Assigned', 'FindingDriver', 'Completed','Followup1','Followup2','FeedbackPending'].each do |role|
  Status.find_or_create_by({name: role})
end

# Trip type seed
['Normal', 'Recurring', 'Round','ForOthers'].each do |role|
  TripType.find_or_create_by({name: role})
end
