define(['backbone'],function(Backbone){
	"use strict"

	var cartItem = Backbone.Model.extend({
		defaults:{
			qty: 0,
			totalAmount: 0,
			price: 0,
			productName: 'Item Name',
			imgUrl: 'assets/imgs/default.jpg',
			baseUnit: 'kg',
			baseVal: 0
			// id://Create unique identifier for cart deletion?
		},
		initialize: function(){
			// Trigger render of cart collection on addition
			this.totalAmount = this.qty*this.price
		}
	})

	return {
		cartItem: cartItem
	}
})