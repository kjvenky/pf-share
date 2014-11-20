define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/admin/views/aBaseCollectionView',
	'js/utils/jsonUtils'], function($, Backbone, _, Template,aBaseCollectionView,Utils) {

	"use strict"
	var apackingCollectionView = aBaseCollectionView.aBaseCollectionView.extend({
		initialize:function(options){
			this.constructor.__super__.initialize.call(this, options) // Run the initialize of base class
			_.extend(this.events, aBaseCollectionView.aBaseCollectionView.prototype.events)
			this.idKey = "productName"
			this.printID = '#panel'
			this.editTarget = 'packing/edit/'
		},

		events : {
			"click #pushToPReady": "pushToPReady",
			"click #pushToCarton": "pushToCarton"
		},

		pushToPReady: function(){
			$.ajax({
				url: contextUrl2 + "/admin/orders/process_orders/pushAllPackingToPackingDone",
				type: "GET",
				success:function(data){					
					// Refresh the page
					Backbone.history.loadUrl();
				}
			})

		},

		pushToCarton: function(){
			$.ajax({
				url: contextUrl2 + "/admin/orders/process_orders//pushPackingDoneToCartoning",
				type: "GET",
				success:function(data){
					// Refresh the page
					Backbone.history.loadUrl();
				}
			})
			this.render()
		},

		renderBody : function(data, headings) { // Overwrite renderbody to show empty table if bn
			var that = this;
			var tablebody = ""
			if(typeof data[0].attributes.url == "undefined"){
				_.each(data, function(model,iterator) {	
					tablebody += that.renderRow(model.attributes, headings, iterator+1)
				})
			}else{
				tablebody = ""
			}
			return tablebody
		},

		renderRow : function(attr, headings, count) {
			var that = this;
			var row = '<tr data-id="'+Utils.findKeyValue('productName', attr)+'">'
			_.each(headings, function(key) {
				if(key.trim().toLowerCase()=="S.No".trim().toLowerCase()){
						row += '<td>'+(count)+'</td>'
				}else if(key.trim().toLowerCase()=="details".trim().toLowerCase()){
						row += '<td>'+ that.renderOrderDetails(attr) +'</td>'
				}else{
						var result = Utils.findKeyValue(key, attr)
						row += '<td>' + result + '</td>'
				}	
			})
			return row + '</tr>'
		},
	
		renderOrderDetails:function(attr){
			var result='';
			_.each(attr.details,function(item){
				result+='<div style="background:#333;color: #fff;width: 100px;font-size: 12px;font-weight: bold;padding: 0px;border-radius: 5px;border: 1px solid #ddd;">				<img src="'+contextUrl+'/'+item.product.imgUrl+'" width="32px" height="32px">&nbsp;&nbsp;&nbsp;'+item.qtyOrdered+' '+item.product.baseUnit.unitName+'</div>'
			})
			return result
		},
	})


	return {
		apackingCollectionView : apackingCollectionView
	}
})