define(['jquery',
		'backbone',
		'js/models/cartItem',
		'backbone.localStorage'],function($,Backbone,cartItem,localStorage){

	"use strict"

	var cartItemCollection = Backbone.Collection.extend({
		model: cartItem.cartItem,	
		localStorage: new localStorage("ecarts"), // Using it to retreive old cart on reload
		name: "ecart",

		// Implement coupon code and discounts

		initialize: function(){
			// Do nothing
			this.totalAmount = 0;
			this.txnIds = [];
			_.bindAll(this,"addItem","getTotal","deleteItem","getTotalItems","clearCart","subItem");
		},

		getTxnIds: function(){
			return this.txnIds
		},

		addItem:function(product){
			// Check multiple existance
			var item = this.findWhere({productName: product.attributes.productName}) // Returns the first model

			if(item){ // Get the item and update it. Change the code
				item.attributes.qty += product.attributes.baseUnit.unitValue
				item.attributes.totalAmount = Math.round(item.attributes.qty*item.attributes.price*10)/10
				this.set(item,{remove:false}).save() // localStorage
				app.views.basket.render() // Not good coding practise
			}else{ 	  // Add if item doesnt exist
				var i = this.add(new cartItem.cartItem({ // Mapping from product to cart item
					price: product.attributes.sellingPrice,
					qty: product.attributes.baseUnit.unitValue,
					baseVal: product.attributes.baseUnit.unitValue,
					baseUnit: product.attributes.baseUnit.unitName,
					productName: product.attributes.productName,
					totalAmount: Math.round(product.attributes.sellingPrice*product.attributes.baseUnit.unitValue*10)/10,
					imgUrl: product.attributes.imgUrl,
				})); // localStorage
				i.save()
			}

				// Get item in product and edit?
				var prod = app.products.findWhere({productName: product.attributes.productName})
				prod.attributes.qtyinCart += prod.attributes.baseUnit.unitValue
			
			app.views.basket.render() 
			app.views.products.render() 
		},

		subItem: function(product){
			// Check multiple existance
			var item = this.findWhere({productName: product.attributes.productName}) // Returns the first model
			// Get item in product and edit?
				var prod = app.products.findWhere({productName: product.attributes.productName})

			if(item.attributes.qty <= product.attributes.baseUnit.unitValue){ // Get the item and update it. Change the code
				this.deleteItem(item)
				prod.attributes.qtyinCart = 0

			}else{ 	  			
				item.attributes.qty -= product.attributes.baseUnit.unitValue
				item.attributes.totalAmount = item.attributes.qty*item.attributes.price
				this.set(item,{remove:false}).save() // localStorage
				prod.attributes.qtyinCart = item.attributes.qty
			}

			app.views.basket.render()
			app.views.products.render() 
		},

		deleteItem: function(cartItem){
			
			// Update the qty in Cart in product
			if(app.products.findWhere({productName: cartItem.attributes.productName})){
				var item = app.products.findWhere({productName: cartItem.attributes.productName}) // Returns the first model
				item.attributes.qtyinCart = 0
			}
			this.get(cartItem).destroy() // Destroy in localStorage also
			this.remove(cartItem)
		},

		getTotal: function(){
			var total = 0
			_.each(this.models,function(model){
				total += model.attributes.totalAmount
			})
			return Math.round(total)
		},

		getTotalweight: function(){
			var totalWeight = 0
			_.each(this.models,function(model){
				if(model.get('baseUnit') !== "No."){
					totalWeight += model.attributes.qty // 
					}
			})
			return totalWeight
		},

		getTotalItems: function(){
			return this.length
		},

		placeOrder: function(){ // This ist he right place
			// Construct the required JSON 
			var order = {        
						"personName": "kjvenky", // Fetch from cookies
						"paymentDone": true,
						"cart": this.toJSON(),
						"amount": this.getTotal(),
					}

			$.ajax({
				type: "POST",
				url: "/", //Give the url here
				data: order,
				success:function(){
					this.clearCart()// On Success delete from the localStorage
					}
				})

		},

		clearCart: function(){
			window.localStorage.clear() // Clear the localStorage	
			this.reset() // Delete from the Javascript environment
		}

	})

	return {
		cartItemCollection: cartItemCollection
	}
})