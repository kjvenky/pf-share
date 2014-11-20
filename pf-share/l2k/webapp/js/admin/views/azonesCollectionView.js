define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/admin/views/aBaseCollectionView',
	'js/utils/jsonUtils'], function($, Backbone, _, Template,aBaseCollectionView,Utils) {

	"use strict"
	var azonesCollectionView = aBaseCollectionView.aBaseCollectionView.extend({
		initialize:function(options){
			this.constructor.__super__.initialize.call(this, options) // Run the initialize of base class
			this.idKey = "zoneName"
			this.printID = '#panel'
			this.editTarget = 'zones/edit/'
		}
	})

	return {
		azonesCollectionView : azonesCollectionView
	}
})