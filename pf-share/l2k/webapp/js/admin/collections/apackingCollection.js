define(['jquery',
		'backbone',
		'js/admin/models/apackingModel'],function($,Backbone,apackingModel){

	"use strict"

	var apackingCollection = Backbone.Collection.extend({
		model: apackingModel.apackingModel,
		url: contextUrl+'/admin/orders/process_orders/getPackingDetails', 
		initialize: function(){
			this.sort_key = 'product';
		},
		comparator:function(item){
			return item.get(this.sort_key)['productName'];
		},
		sortByField: function(fieldName) {
        	this.sort_key = fieldName;	
       	 	this.sort();
    	}
	})

	return {
		apackingCollection: apackingCollection
	}
})