define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/admin/views/aBaseCollectionView',
	'js/utils/jsonUtils'], function($, Backbone, _, Template,aBaseCollectionView,Utils) {

		"use strict"
		var atransactionsCollectionView = aBaseCollectionView.aBaseCollectionView.extend({
			initialize:function(options){
			this.constructor.__super__.initialize.call(this, options) // Run the initialize of base class
			this.idKey = "transactionID"
			this.printID = '#panel'
			this.editTarget = 'transactions/edit/'
		},
		events :  function(){
			return _.extend({},aBaseCollectionView.aBaseCollectionView.prototype.events,{
				"click #filterbyStatus": "filterStatus",
			});
		},
		filterStatus:function(){
			var status = $('#filterbyStatus').val()
			$('#filterbyStatus').change(function(){
				console.log('Choice changed')
			});
			console.log(this.collection);
			if( status !== "All"){
				var result = this.collection.where({transactionStatus: status})			
				this.render(result)
			}else{
				this.render()
			}
		},
	})

		return {
			atransactionsCollectionView : atransactionsCollectionView
		}
	})