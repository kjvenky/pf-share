define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/admin/views/aBaseCollectionView',
	'js/utils/jsonUtils'], function($, Backbone, _, Template,aBaseCollectionView,Utils) {

	"use strict"
	var ausersCollectionView = aBaseCollectionView.aBaseCollectionView.extend({
		initialize:function(options){
			this.constructor.__super__.initialize.call(this, options) // Run the initialize of base class
			this.idKey = "username"
			this.printID = '#panel'
			this.editTarget = 'users/edit/'
		},	

		renderRow : function(attr, headings, count) {
			var that = this;
			var row = '<tr data-id="'+Utils.findKeyValue(this.idKey, attr)+'">'
			_.each(headings, function(key) {
				if(key.trim().toLowerCase()=="S.No".trim().toLowerCase()){
						row += '<td>'+(count)+'</td>'
				}else if(key.trim().toLowerCase()=="couponNames".trim().toLowerCase()){
						row += '<td>'+attr.couponNames[0]+'</td>'
				}else{
						var result = Utils.findKeyValue(key, attr)
						row += '<td>' + result + '</td>'
				}	
			})
			return row + '</tr>'
		},		
	})

	return {
		ausersCollectionView : ausersCollectionView
	}
})