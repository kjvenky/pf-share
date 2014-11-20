	define(['jquery', 'backbone', 'underscore', 'text!js/tpl/cartTransaction.tpl', 'js/views/cartItemView', 'js/views/loginView',
	    'js/views/cartItemCheckoutView', 'js/views/outStandingView', 'js/views/zoneFailView', 'js/utils/userUtils',
	    'js/views/topupView','js/views/userinfoView', 'js/views/cartTransactionView'
	], function($, Backbone, _, Template, cartItemView, loginView, cartItemCheckoutView, outStandingView,
	    zoneFailView, userUtils, topupView, userinfoView) {
	    "use strict"
	    var cartTransactionView = Backbone.View.extend({
	        template: _.template(Template),
	        initialize: function(options) {
	        	this.cartItems = options.cartItems
	        	this.status = options.status
	        	this.total = options.totalAmount
	        	this.items = options.totalItems
	        },
	        events: {

	        },
      		render: function() { // Triggers on every change to cart
      			console.log(this.cartItems)
	            this.$el.html(this.template({
	            	status: this.status,
	            	cartItems: this.cartItems,
	            	items: this.items,
	            	total: this.total
	            }))
	            return this;
	        },
	    })
	    return {
	        cartTransactionView: cartTransactionView
	    }
	})