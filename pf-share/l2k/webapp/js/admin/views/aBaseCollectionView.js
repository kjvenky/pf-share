define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/utils/jsonUtils','bootstrap'], function($, Backbone, _, Template,Utils) {
"use strict"

	var aBaseCollectionView = Backbone.View.extend({
		template : _.template(Template),
		initialize : function(options) {
			this.title = options.title || undefined
			this.type = options.type || undefined
			this.mapping = options.mapping || undefined
			this.headings = options.headings
			this.searchTerm = options.searchTerm
			this.searchField = options.searchField
			this.messageType = options.messageType || undefined
			this.message = options.message || undefined
			this.idKey = options.idKey || undefined
			this.printID = options.printID || undefined
			this.editTarget = options.editTarget || undefined
			this.sort = options.sort || undefined
			_.bindAll(this, 'render', 'renderBody', 'renderHeadings',
					'renderRow', 'editRow');
		},
		
		events : {
				"dblclick tr":"editRow",
				'click #clearSearch': 'clearSearch',
				'click #iSearch': 'search',
				'click #printData': 'printData',
				// 'keyup #searchVal': 'search'
		},
		
		printData: function(){
				var divContents = $(panel).html();
				var printWindow = window.open('', '_blank');
				printWindow.document.write('<html><head><title>LandToKitchen</title>');
				printWindow.document.write('</head><body >');
				printWindow.document.write(divContents);
				printWindow.document.write('</body></html>');
				printWindow.document.close();
				printWindow.print();
		},

		// Search on focus out	
		search:function(e){
			// if(e.which !==13 ){ return } // Do nothing if its not enter
			var that = this;
				this.searchField = $('#btn-text').text()
				this.searchTerm = $('#searchVal').val(); // Get the search term				
				var searchCollection = this.collection.filter(function(model){
				// Search based on the attributes		
				// Find in the any attributes value - No deep search
				var searchField = this.headings[this.mapping.indexOf(this.searchField)]
				var value = Utils.flatJSON(model.attributes)[""+searchField+""]
				if(value.trim().toLowerCase()!==this.searchTerm.trim().toLowerCase()){
					return false
				}else{ 
					return true
				}
			},this)
				if(searchCollection.length){
					this.messageType = "success"	
					this.message = 'Search results found!'				
					this.render(searchCollection)
				}else{
					this.messageType = "failure"
					this.message = 'No search results found!'
					this.render(this.collection)
				}
			},

		clearSearch: function(e){
			e.preventDefault()
			this.searchTerm = this.message = this.messageType = undefined
			this.render()
		},

		editRow: function(e){
			e.preventDefault();
			var id = $(e.currentTarget).data("id");
			admin.navigate(this.editTarget+id,{trigger:true}) // Hard coded. Oops!
		},
		
		render : function(data) {
			var models = data || this.collection.models
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
			var that = this;
			var tablebody = ""
			_.each(data.reverse(), function(model,iterator) {
				tablebody += that.renderRow(model.attributes, headings, data.length-iterator)
			})
			data.reverse() // Re reverse the data back :P
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
		aBaseCollectionView : aBaseCollectionView
	}
})