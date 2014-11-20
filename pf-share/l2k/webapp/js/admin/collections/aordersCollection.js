define(['jquery',
		'backbone',
		'js/admin/models/aordersModel'],function($,Backbone,aordersModel){

	"use strict"

	var aordersCollection = Backbone.Collection.extend({
		model: aordersModel.aordersModel,
		initialize: function(options){
			// Do nothing
			this.url = options.url || undefined
		}
	})

	return {
		aordersCollection: aordersCollection
	}
})