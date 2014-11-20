define(['backbone'],function(Backbone){
	"use strict"

	var asessionModel = Backbone.Model.extend({
   		 defaults: {
   		 	username: undefined
   		 },

		initialize: function(options){ // Default options for the product
			// Iterate through each property and use defaults if not available
		},

		isAuthorized: function(){
			return Boolean(this.get("username"));
		}

	})

	return {
		asessionModel: asessionModel
	}
})