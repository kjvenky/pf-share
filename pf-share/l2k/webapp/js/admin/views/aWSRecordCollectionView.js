define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/admin/views/aBaseCollectionView',
	'js/utils/jsonUtils'], function($, Backbone, _, Template,aBaseCollectionView,Utils) {

	"use strict"
	var aWSRecordCollectionView= aBaseCollectionView.aBaseCollectionView.extend({
		initialize:function(options){
			this.constructor.__super__.initialize.call(this, options) // Run the initialize of base class
			this.idKey = "productName"
			this.printID = '#panel'
			this.editTarget = 'coupons/edit/'
		}
	})

	return {
		  aWSRecordCollectionView: aWSRecordCollectionView 
	}
})