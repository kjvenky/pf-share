define(['jquery',
		'backbone',
		'js/admin/models/ainventoryRefillRecordModel'],function($,Backbone,ainventoryRefillRecordModel){

	"use strict"

	var ainventoryRefillRecordCollection = Backbone.Collection.extend({
		model: ainventoryRefillRecordModel.ainventoryRefillRecordModel,
		url: contextUrl+'/admin/inventory/viewAllRefillRecords', 
		initialize: function(){
			// Do nothing
		}
				
	})

	return {
		ainventoryRefillRecordCollection: ainventoryRefillRecordCollection
	}
})