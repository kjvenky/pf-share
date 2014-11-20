define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/atable.tpl', 
	'js/utils/jsonUtils'], function($, Backbone, _, Template,Utils) {

	"use strict"
	var aTableView = Backbone.View.extend({
		initialize:function(options){
			this.data = options.data
			this.idKey = "productName"
			this.headings = options.headings
			this.mapping = options.mapping
			this.title = options.Tablename || "Price History"
		},

		template: _.template(Template),

		render : function(data) {
			var models = data || this.data
			this.$el.html(this.template({
					title: this.title,
				 })).find('.panel-heading').html(this.title) // Panel title
			this.$el.find('thead').append(this.renderHeadings(this.headings,this.mapping))
			this.$el.find('tbody').append(this.renderBody(models, this.headings,this.sort))
			return this // Return collection
		},

		renderBody : function(data, headings,sort) {
			var that = this;
			var tablebody = ""
			_.each(data, function(model,iterator) {
				tablebody += that.renderRow(model, headings, iterator+1)
			})
			return tablebody
		},

		renderRow : function(attr, headings, count) {
			var that = this;
			var row = '<tr data-id="'+ attr[this.idKey] +'">'
			_.each(headings, function(key) {
				if(key.trim().toLowerCase()=="S.No".trim().toLowerCase()){
						row += '<td>'+ count +'</td>'
				}else{
						var result = Utils.findKeyValue(key, attr)
						row += '<td>' + result + '</td>'
				}	
			}, this)
			return row + '</tr>'
		},

		renderHeadings : function(headings, mapping) {
			var row = '<tr>'
			_.each(headings, function(title,iterator) {
				if(iterator==0){
					row += '<th width="4%">' +  mapping[iterator] +  '</th>'				
				}else{
					row += '<th>' +  mapping[iterator] +  '</th>'
				}
			})
			return row + '</tr>'		
		}

	})

	return {
		aTableView : aTableView
	}
})