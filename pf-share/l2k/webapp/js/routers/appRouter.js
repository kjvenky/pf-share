define(['jquery',
	'backbone',
	'underscore',
	'js/views/indexView',
	'js/collections/productCollection',
	'js/collections/cartItemCollection',
	'js/views/productCollectionView',
	'js/views/cartItemCollectionView',
	'js/models/sessionModel'
	],function($,Backbone,_,indexView,productCollection,cartItemCollection,productCollectionView,cartItemCollectionView,sessionModel){

		var appRouter = Backbone.Router.extend({
		/*
		1. No implementation for individual product views
		2. 
		*/
		// initialize all the application global variables. What will these hold.
		views: {},
		products: null,
		cart: null,
		session:  new sessionModel.sessionModel(),
		zonesAllowed: [], // Pincodes added according to Mail on 21st July: Pincodes to include for order and delivery 11-7-4014
		pinsAllowed:["600045","600046","600059","600047","600064","600044","600043","600075","600061","600073","600088","600114","600016","600032","600015","600017","600033","600036","600046","603211","603202"],
		routes: {

			  "(?*query)":"index", // Single page application?

			// "l2k/(?*query)":"index", // Single page application?
		},

		// initialize the apps instances	
		initialize: function(){
			// Initialize a new basket
			this.cart = new cartItemCollection.cartItemCollection() // Implement rendering from localStorage
			// Initialize the product collection and fetch the data
			this.products = new productCollection.productCollection();
		},

		index: function(query){ 			
			this.views.index = new indexView.indexView({query:query}).render() // Render the indexView. May be this should be in initialize
			if(app.cart !== null) this.cart.fetch();

			// Update product model if present in cart
			this.products.fetch({	
				success: function(products){
					_.each(products.models,function(product){
						var item = ((app.cart !== null)?app.cart.where({productName: product.attributes.productName})[0]:undefined)
						if(item){
							product.attributes.qtyinCart = item.attributes.qty 
						}
					})
				}
			})

			// Delete the cart itesms that are not there in products
			_.each(app.cart.models,function(item){
				if(typeof app.products.where({productName: item.attributes.productName})[0]== "undefined"){
					app.cart.deleteItem(item)
				}
			})

			this.views.products = new productCollectionView.productCollectionView({collection: this.products});
			this.views.basket = new cartItemCollectionView.cartItemCollectionView({collection: this.cart})
		},

	})

	return { //Returns all the publicly functions from this module
		appRouter: appRouter
	}
});
