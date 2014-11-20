define(['jquery',
		'backbone',
		'js/admin/models/aproductInventoryModel'],function($,Backbone,aproductInventoryModel){

	"use strict"

	var aproductInventoryCollection = Backbone.Collection.extend({
		model: aproductInventoryModel.aproductInventoryModel,
		url: contextUrl+'/admin/inventory/getAll', 
		initialize: function(){
			this.sort_key = 'productName'; // For sorting
		}
	})

	return {
		aproductInventoryCollection: aproductInventoryCollection
	}
})