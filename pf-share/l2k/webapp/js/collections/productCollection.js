define(['jquery',
		'backbone',
		'js/models/productModel'],function($,Backbone,productModel){

	"use strict"

	var productCollection = Backbone.Collection.extend({
		model: productModel.productModel,
		url: 'product/list', 
		initialize: function(){
			// Do nothing
		}
	})

	return {
		productCollection: productCollection
	}
})