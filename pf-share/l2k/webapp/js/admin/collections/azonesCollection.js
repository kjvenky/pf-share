define(['jquery',
		'backbone',
		'js/admin/models/azoneModel'],function($,Backbone,azoneModel){

	"use strict"

	var azonesCollection = Backbone.Collection.extend({
		model: azoneModel.azoneModel,
		url: contextUrl+'/admin/getAllZones', 
		initialize: function(){
			// Do nothing
		}
	})

	return {
		azonesCollection: azonesCollection
	}
})