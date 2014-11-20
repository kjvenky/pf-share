define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/cart.tpl',
	'js/utils/userUtils',	
	'js/views/cartItemView',	
	'js/views/cartItemCheckoutView',
	'js/views/cartItemCheckoutCollectionView',
	'text!js/tpl/cartFull.tpl',
	],function($,Backbone,_,Template,userUtils, cartItemView,cartItemCheckoutView,cartItemCheckoutCollectionView,cartFull){

		"use strict"
		
		var cartItemCollectionView = Backbone.View.extend({

			el: '#basket',

			template: _.template(Template),

			initialize:function(){
				_.bindAll(this,'render','sticky','checkout'); // methods are bound to the instance of the
				$(window).bind('scroll',this.sticky);			
				this.listenTo(this.collection,'change remove add reset update', this.render); // Finally working! Not working with 
				this.render()
			},

			events: {
				"click #deleteCart": "clearCart",
				'click #basket-checkout': 'checkout',
				"click a#closemessage": "closemessages"
			},

			sticky: function(){ // Implementing sticky basket to use as needed
					// Ref:http://www.pixelbind.com/make-a-div-stick-when-you-scroll
					var s = $("#basket"); 
					var pos = s.position()
					var that = this
					$(window).scroll(function() {
						var windowpos = $(window).scrollTop();
						if (windowpos >= 337) { // Hard coded a bit. Figure out later
							$(that.el).addClass("stick");
						} else {							
							$(that.el).removeClass("stick"); 
						}					
					})
				},
				
				closemessages:function(){
					$('#messages').slideUp(function(){
						this.empty();
					}, 10000)
				},

				clearCart: function(e){
					e.preventDefault();
				this.collection.clearCart()// Clear checkout cartview?
			},

			checkout: function(){ // Can be done using event listeners
				if(this.collection.getTotalItems()>0){
					if(!app.views.cartItemCheckoutCollectionView){
						app.views.cartItemCheckoutCollectionView =  new cartItemCheckoutCollectionView.cartItemCheckoutCollectionView({collection: this.collection})
						app.views.cartItemCheckoutCollectionView.render()
					}else{
						app.views.cartItemCheckoutCollectionView.render()
					}
				}else{
					userUtils.topMessages('No Items in the cart to Checkout.','topFailure', 5000)
				}	
			},
			
			// Render items based on the importance. Needs to be thought of what can be called as importance
			render: function(){ // Triggers on every change to cart
				
				this.$el.html(this.template({
					totalAmount: Math.floor(this.collection.getTotal()* 100) / 100,
					totalItems: this.collection.getTotalItems()
				}))

			// Empty the basket and render it again
			$('.cartItem').remove();
			_.each(this.collection.models,function(item){
				// item.attributes.totalAmount = item.attributes.qty*item.attributes.price
				$('.basket-body').append(new cartItemView.cartItemView({model:item}).render()) // Make this generic to add
			}, this)
		},

	})
return {
	cartItemCollectionView: cartItemCollectionView
}
})