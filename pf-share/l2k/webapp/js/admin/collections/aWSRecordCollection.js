define(['jquery',
		'backbone',
		'js/admin/models/aWSRecordModel'],function($,Backbone,aWSRecordModel){

	"use strict"

	var aWSRecordCollection = Backbone.Collection.extend({
		model: aWSRecordModel.aWSRecordModel,
		url: contextUrl+'/admin/inventory/viewAllWholeSaleRecords', 
		initialize: function(){
			// Do nothing
		}
	})

	return {
		aWSRecordCollection: aWSRecordCollection
	}
})