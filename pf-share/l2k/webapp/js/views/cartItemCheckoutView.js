define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/cartItemCheckout.tpl'
	],function($,Backbone,_,Template){

	"use strict"

	var cartItemCheckoutView = Backbone.View.extend({
		template: _.template(Template),
		tagName: 'tr',
		initialize:function(){
			_.bindAll(this,'deleteItem','render','subItem','addItem');
		},

		events:{
			"click span#deleteItem": "deleteItem",
			"click .btnSub": "subItem",
			"click .btnAdd": 'addItem'
		},

		destroyView: function(){
			this.undelegateEvents();
			this.$el.removeData().unbind(); 
		},

		subItem:function(e){			
			e.preventDefault();
			e.stopPropagation();
			var product = app.products.findWhere({productName: this.model.attributes.productName})
			app.cart.subItem(product) // This needs to pass the product not the cart item
		},

		addItem: function(e){			
			e.preventDefault();			
			e.stopPropagation();
			var product = app.products.findWhere({productName: this.model.attributes.productName})
			app.cart.addItem(product) // This needs to pass the product not the cart item
		},

		render: function(){ // Triggers on every change to cart
			return this.$el.append(this.template(this.model.toJSON()))
		},

		deleteItem: function(e){ // used to remove Item from cart
			e.preventDefault();
			e.stopPropagation();	
			app.cart.deleteItem(this.model) // Not a good way to code			
			app.views.products.render()
		}

	})
	return {
		cartItemCheckoutView: cartItemCheckoutView
	}
})