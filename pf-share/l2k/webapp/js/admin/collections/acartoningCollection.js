define(['jquery',
		'backbone',
		'js/admin/models/acartoningModel'],function($,Backbone,acartoningModel){

	"use strict"

	var acartoningCollection = Backbone.Collection.extend({
		model: acartoningModel.acartoningModel,
		url: contextUrl+'/admin/orders/process_orders/getCartoningDetails', 
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
		acartoningCollection: acartoningCollection
	}
})