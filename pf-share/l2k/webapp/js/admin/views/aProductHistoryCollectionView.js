define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/admin/views/aBaseCollectionView',
	'js/utils/jsonUtils'], function($, Backbone, _, Template,aBaseCollectionView,Utils) {

	"use strict"
	var aProductHistoryCollectionView = aBaseCollectionView.aBaseCollectionView.extend({
		initialize:function(options){
			this.data = options.collection || undefined
			this.constructor.__super__.initialize.call(this, options) // Run the initialize of base class
		},

		render : function(data) {
			var models = data || this.data
			console.log(model)
			this.$el.html(this.template({
					type:this.type, 
					searchTerm: this.searchTerm,
					idKey: this.searchField || this.mapping[this.headings.indexOf(this.idKey)],
					message: this.message,
					messageType: this.messageType,
					fields: this.mapping
				 })).find('.panel-heading').html(this.title) // Panel title
			this.$el.find('thead').append(this.renderHeadings(this.headings,this.mapping))
			this.$el.find('tbody').append(this.renderBody(models, this.headings,this.sort))
			return this // Return collection
		},

		renderBody : function(data, headings,sort) {
			console.log(data)
			var that = this;
			var tablebody = ""
			_.each(data, function(model,iterator) {
				tablebody += that.renderRow(model.attributes, headings, iterator+1)
			})
			return tablebody
		},

		renderRow : function(attr, headings, count) {
			var that = this;
			var row = '<tr data-id="'+Utils.findKeyValue(this.idKey, attr)+'">'
			_.each(headings, function(key) {
				if(key.trim().toLowerCase()=="S.No".trim().toLowerCase()){
						row += '<td>'+(count)+'</td>'
				}else{
						var result = Utils.findKeyValue(key, attr)
						row += '<td>' + result + '</td>'
				}	
			})
			return row + '</tr>'
		}

	})

	return {
		aProductHistoryCollectionView : aProductHistoryCollectionView
	}
})