define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"
	var aproductInventoryModel = Backbone.Model.extend({	
		default: {
			unitName: '',
			qtyBooked:0,
			buyingPrice: 0,
			sellingPrice: 0,
			productName: 'Item Name'
		}})

	return {
		aproductInventoryModel: aproductInventoryModel
	}
})