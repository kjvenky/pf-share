define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/admin/views/aBaseCollectionView',
	'js/utils/jsonUtils'], function($, Backbone, _, Template,aBaseCollectionView,Utils) {

	"use strict"
	var aproductsCollectionView = aBaseCollectionView.aBaseCollectionView.extend({
		initialize:function(options){
			this.constructor.__super__.initialize.call(this, options) // Run the initialize of base class
			this.idKey = "productName"
			this.printID = '#panel'
			this.editTarget = 'products/edit/'
		},

		renderBody : function(data, headings,sort) {
			var that = this;
			var tablebody = ""
			_.each(data, function(model,iterator) {
				tablebody += that.renderRow(model.attributes, headings, iterator+1)
			})
			return tablebody
		},
	})

	return {
		aproductsCollectionView : aproductsCollectionView
	}
})