define([ 'jquery', 
	'backbone',
	'underscore',
	'text!js/admin/tpl/apanel.tpl', 
	'js/admin/views/aBaseCollectionView',
	'js/utils/jsonUtils','datepicker'], function($, Backbone, _, Template,aBaseCollectionView,Utils,datepicker) {
	"use strict"

	var aordersCollectionView = aBaseCollectionView.aBaseCollectionView.extend({
		initialize:function(options){
			this.constructor.__super__.initialize.call(this, options) // Run the initialize of base class
			_.extend(this.events, aBaseCollectionView.aBaseCollectionView.prototype.events)
			this.idKey = "username"	
			this.printID = '#panel'
			this.editTarget = 'orders/edit/'
			this.searchField = 'Mobile No.'
		},

		events : {
			"click #pushToPacking": "pushToPacking",
			"click #filterbyStatus": "filterStatus",
			"click #filterbyTime": "filterTime",
			"click .orderStatusChange":"orderStatusChange"
		},

		orderStatusChange:function(e){
			// Remove any labels that are siblings to this
			$('#'+e.target.id).siblings('.label').remove();
			$.ajax({
				url: contextUrl+'/admin/orders/process_orders/changeOrderStatus?orderPkey='+e.target.id+'&statusName='+e.target.value,
				success:function(data){
					// Add a siblings that removes itself after x seconds
					$('<span class="label label-success" style="margin-top:10px">Updated</span>')
					.insertAfter($('#'+e.target.id)).slideDown('slow').fadeOut(5000);
				}
			})
		},

		filterStatus:function(){
			var status = $('#filterbyStatus').val()
			$('#filterbyStatus').change(function(){
				alert('Choice changed')
			});

			if( status !== "All"){
				var result = this.collection.where({orderStatus: status})			
				this.render(result)
			}else{
				this.render()
			}
		},

		filterTime:function(){
			console.log($('#filterbyTime').val())
			var result = ''
			this.render(result)
		},

		pushToPacking:function(){
			$.ajax({
				url:contextUrl+'/admin/orders/process_orders/pushFreshToPacking',
				type: 'GET'
			})
			this.message = 'All the fresh orders are sent for packing.'
			this.messageType = 'success'
			$('tbody').empty()
		},




		renderBody : function(data, headings) { // Overwrite renderbody to show empty table if bn
			var that = this;
			var tablebody = ""
			if(typeof data[0].attributes.url == "undefined"){
				_.each(data.reverse(), function(model,iterator) {	
					tablebody += that.renderRow(model.attributes, headings, data.length-iterator)
				})
			}else{
				tablebody = ""
			}
			data.reverse() // To get back again
			return tablebody
		},

		renderRow : function(attr, headings, count) {
			var that = this;
			var row = '<tr data-id="'+Utils.findKeyValue('orderPkey', attr)+'">'
			_.each(headings, function(key) {
				if(key.trim().toLowerCase()=="S.No".trim().toLowerCase()){
						row += '<td>'+(count)+'</td>'
				}else if(key.trim().toLowerCase()=="OrderStatus".trim().toLowerCase()){
						row += '<td>'+ that.renderOrderStatus(attr) +'</td>'
				}
				else if(key.trim().toLowerCase()=="details".trim().toLowerCase()){
						row += '<td>'+ that.renderOrderDetails(attr) +'</td>' // Attack an inline form
				}else{
						var result = Utils.findKeyValue(key, attr)
						if(result == undefined)
							{
								result = "Not available"
							}
						row += '<td>' + result + '</td>'
				}	
			})
			return row + '</tr>'
		},
		
		renderOrderStatus:function(attr){ // Way to change order status quickly
			var status= attr.orderStatus;
			var list = [["Order Created"], // Default list
						["Processing Order"],
						["Ready for Delivery"],
						["Waiting Payment"],
						["Order Completed"],
						["Cancelled"],
						["In Transit"],
						["Delivered to Distributor"],
						["Delivered to Customer"],
						];

			var result = '<select class="btn orderStatusChange" id="'+attr.orderPkey+'" style="padding:4px 12px;width:100%;">';
			_.each(list,function(stat){
				if(stat == status){
					result += '<option selected value="'+stat+'"">'+stat+'</option>'
				}else{
					result += '<option value="'+stat+'"">'+stat+'</option>'				
				}

			})
			result = result + '</select>';
			
     	return result
		},

		renderOrderDetails:function(attr){
			var result='';
			_.each(attr.details,function(item){
				result+='<b>'+item.product.productName+'</b><div style="background:#333;color: #fff;width: 100px;font-size: 12px;font-weight: bold;padding: 0px;border-radius: 5px;border: 1px solid #ddd;"><img src="'+contextUrl+'/'+item.product.imgUrl+'" width="32px" height="32px">&nbsp;&nbsp;&nbsp;'+item.qtyOrdered+' '+item.product.baseUnit.unitName+'</div>'
				// result+='<div style="font-weight:bold;">'+item.product.productName+':'+item.qtyOrdered+' '+item.product.baseUnit.unitName+'</div>'
			})
			return result
		},
	})


	return {
		aordersCollectionView : aordersCollectionView
	}
})