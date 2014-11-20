define(['jquery',
		'backbone',
		'js/admin/models/atransactionModel'],function($,Backbone,atransactionModel){

	"use strict"

	var atransactionsCollection = Backbone.Collection.extend({
		model: atransactionModel.atransactionModel,
		url: contextUrl+'/admin/transactions/getAllTransactions', 
		initialize: function(){
			// Do nothing
		}
	})

	return {
		atransactionsCollection: atransactionsCollection
	}
})