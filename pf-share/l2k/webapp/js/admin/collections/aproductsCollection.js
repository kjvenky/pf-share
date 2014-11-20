define(['jquery',
		'backbone',
		'js/admin/models/aproductModel'],function($,Backbone,aproductModel){

	"use strict"

	var aproductsCollection = Backbone.Collection.extend({
		model: aproductModel.aproductModel,
		url: contextUrl+'/admin/products/getAll', 
		initialize: function(){
			this.sort_key = 'productName'; // For sorting
		},
		comparator:function(item){
			return item.get(this.sort_key);
		},
		sortByField: function(fieldName) {
        	this.sort_key = fieldName;
       	 	this.sort();
    	}
	})

	return {
		aproductsCollection: aproductsCollection
	}
})