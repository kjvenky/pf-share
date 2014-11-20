define(['backbone'],function(Backbone){
	"use strict"

	var userModel = Backbone.Model.extend({
   		 schema: {
        	email: { validators: ['required', 'email'] },
        	password:   { type: "Password", validators: ['required', 'password'] }
   		 },

		initialize: function(options){ // Default options for the product
			// Iterate through each property and use defaults if not available
		}		

	})

	return {
		userModel: userModel
	}
})