define(['backbone'],function(Backbone){
	"use strict"

	var productModel = Backbone.Model.extend({
		defaults:{
			productName: 'Item Name',
			sellingPrice: 0,
			imgUrl: 'https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/tomato-.png', // Only one image for the vegetable ecommerce
			baseUnit: {
				unitName: 'kg',
				unitValue: 0.25
			},
			qtyinCart: 0
		},

		initialize: function(options){ // Default options for the product
			// Iterate through each property and use defaults if not available
		}		

	})

	return {
		productModel: productModel
	}
})