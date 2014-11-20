define(['jquery',
		'backbone',
		'js/admin/models/ausersModel'],function($,Backbone,ausersModel){

	"use strict"

	var ausersCollection = Backbone.Collection.extend({
		model: ausersModel.ausersModel,
		initialize: function(options){
			this.sort_key = 'cid'
			this.url = options.url || undefined
		},
		comparator:function(item){
			return (this.length - item.id) + 1;
		},
		sortByField: function(fieldName) {
        	this.sort_key = fieldName;
       	 	this.sort();
    	}
	})

	return {
		ausersCollection: ausersCollection
	}
})