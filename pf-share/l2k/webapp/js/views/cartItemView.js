define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/cartItem.tpl'
	],function($,Backbone,_,Template){

	"use strict"

	var cartItemView = Backbone.View.extend({
		template: _.template(Template),

		initialize:function(){
			_.bindAll(this,'render','deleteItem');
			this.listenTo(this.model,'change:qty',function(){
			})
		},

		events:{
			"click a#delete": "deleteItem"	
		},

		render: function(){ // Triggers on every change to cart
			return this.$el.append(this.template(this.model.toJSON()))
		},

		deleteItem: function(e){ // used to remove Item from cart
			e.preventDefault();
			app.cart.deleteItem(this.model) // Not a good way to code
			app.views.products.render()
		}

	})
	return {
		cartItemView: cartItemView
	}
})