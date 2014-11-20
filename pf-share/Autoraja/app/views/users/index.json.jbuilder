json.array! @users do |user|
	json.id user.id
	json.username user.username
	json.email user.email
	json.number user.phonenumber
	json.profile user.profile
	json.address user.address
end