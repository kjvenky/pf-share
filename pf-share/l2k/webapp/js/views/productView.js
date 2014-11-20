define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/product.tpl',
	'text!js/tpl/productinCart.tpl',
	'js/collections/cartItemCollection'
	],function($,Backbone,_,Template,TemplateinCart,cartItemCollection){ // Product view for the list

	// Implement animation to cart? 

	var productView = Backbone.View.extend({ // View in the list of the product. To be called by collection view
		template: _.template(Template),
		className: 'col-sm-3 productItem',
		initialize: function(){
			_.bindAll(this,"render")
			this.render();
		},

		events:{ // Handle model update also within the productView
			"click button#addtoCart":"addtoCart",
			"change input#qty": "update",
			"click .btnAdd": "addtoCart",
			"click .btnSub": "sub"
		},

		sub: function(){
			app.cart.subItem(this.model) // Add item to the cart.Hard coded
		},

		render: function(){
			// Render depending on presence in cart
			if(app.cart !== null && app.cart.where({productName: this.model.attributes.productName}).length){ // Not good coding practise
				this.$el.html(_.template(TemplateinCart,this.model.toJSON()));	
			}else{
				this.$el.html(this.template(this.model.toJSON()));		
			}
			return this
		},

		addtoCart: function(e){
			app.cart.addItem(this.model) // Add item to the cart.Hard coded
		},

		update: function(e){ // Used to update any of the model details like qty
			this.model.set({price:this.$('#qty').val()}) // Change this
		}
	})

	return {
		productView: productView
	}

})