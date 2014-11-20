define(['jquery',
	'backbone',
	'underscore',
	'text!js/admin/tpl/aindex.tpl',
	'js/admin/views/aheaderView',
	'js/admin/views/aloginView',
	'js/admin/views/abarChartView',
	'js/admin/views/aoverlapbarchartView',
	'd3'
	],function($,Backbone,_,aindexTemplate,aheaderView,aloginView,abarChartView,aoverlapbarchartView){

		"use strict"

		var aindexView = Backbone.View.extend({
			template: _.template(aindexTemplate),
			
			initialize:function(){
				_.bindAll(this,'render');
			},

			events:{
				"click": "reload",
				
			},

			// Data plots using d3. Reusuable bar chart?
			data:function(){
				var invData = this.getInventoryData();
				var qtyAvailable = [];
				var qtyBooked = [];
				var products = [];
				_.each(invData,function(val){
					qtyAvailable.push(val.qtyAvailable)
					qtyBooked.push(val.qtyBooked)	
					products.push(val.product.productName)
				})
				// _.each(invData,function(val){
				// 	if(val.qtyAvailable<0){
				// 		qtyAvailable.push(val.qtyAvailable)
				// 	}else if(val.qtyAvailable==0){
				// 		qtyAvailable.push(parseInt(0))
				// 	}
				// 	else{
				// 		qtyAvailable.push(val.qtyAvailable)
				// 	}
				// 	if(val.qtyBooked<0){
				// 		qtyBooked.push(val.qtyBooked)
				// 	}else if(val.qtyBooked==0.0){
				// 		qtyBooked.push(parseInt(0))
				// 	}else{
				// 		qtyBooked.push(val.qtyBooked)
				// 	}
				// 	products.push(val.product.productName)
				// })
				console.log($(window).height())
				console.log($(window).width())
				new abarChartView.abarChartView({
					el:'div.plot-1',
					data: this.getData(),
					ylabel: 'Number of Orders',
					xlabel: '',
					width: $(window).width()*0.37,
					height: 390,
					xFormat: 'Dates',
					xAxisHeight: 30,
					xtickRotate: 0,
					xTickdx:"1em",
					xTickdy:"1em",
					className: 'bar',
					altClassName: 'bar-negitive'
				}).draw()
				new aoverlapbarchartView.aoverlapbarchartView({ // Needs two data values to stack :)
					el:'div.plot-2',
					data: [qtyAvailable, qtyBooked],
					ylabel:'Quantity Available in kgs',
					xlabel:'',
					width:  $(window).width()*0.37,
					height: 390,
					xFormat: 'labels',
					xAxisHeight: 100,
					xtickRotate: -90,
					xTickdx:"-1em",
					xTickdy:"-0.3em",					
					xlabels: products,
					className: 'bar',
					altClassName: 'bar-negitive'
				}).draw()				
				new aoverlapbarchartView.aoverlapbarchartView({ // Needs two data values to stack :)
					el:'div.plot-3',
					data: [qtyBooked, qtyAvailable],
					ylabel:'Quantity Booked in kgs',
					xlabel:'',
					width:  $(window).width()*0.37,
					height: 390,
					xFormat: 'labels',
					xAxisHeight: 100,
					xtickRotate: -90,
					xTickdx:"-1em",
					xTickdy:"-0.3em",					
					xlabels: products,
					className: 'bar',
					altClassName: 'bar-negitive'
				}).draw()
			},

			getInventoryData:function(){
				var data;
				$.ajax({
					url: contextUrl + '/admin/inventory/getAll',
					async: false,
					type: 'GET',
					success: function(resp){
						data = resp
					}
				})
				return data;
			},

			getData: function(){
				var data;
				$.ajax({
					url: contextUrl + '/admin/finances/orders/getLastThirtySlotOrderSlots',
					async: false,
					type: 'GET',
					success: function(resp){
						data = resp
					}
				})
				var dat = [];
				_.each(data,function(val){
					dat.push(val.ordersCount)
				})
				return dat;
			},

			reload:function(){
				Backbone.history.loadUrl();
			},
			
			getFreshOrderCount: function(){
				var d = new Date()
				var dString = d.getDate()+":"+(d.getMonth()+1)+":"+d.getFullYear()+"+"+d.getSeconds()+":"+d.getMinutes()+":"+d.getHours()
				var count = 0;
				$.ajax({
					url: contextUrl + '/admin/orders/process_orders/getFreshOrdersCount?latestTime='+dString,
					type:'GET',
					async: false,
					success:function(data){
						count = data
					}
				})
				return count
			},

			getOpenOrderCount: function(){
				var count = 0;
				$.ajax({
					url: contextUrl + '/admin/orders/process_orders/getOpenOrdersCount',
					type:'GET',
					async: false,
					success:function(data){
						count = data
					}
				})
				return count
			},

		render: function(){
			if($.cookie('admin_logged')){
				$('#header').append(new aheaderView.aheaderView().render().el)
				// Append ContentView
				$('#wrap').html(this.template({
					freshOrderCount: this.getFreshOrderCount(),
					openOrderCount: this.getOpenOrderCount()
				}))
			}else{
				// Append ContentView
				window.location.href = contextUrl + '/admin/'
			}
			// Render the data plots
			this.data();
			return this
		}

	})
		return {
			aindexView: aindexView
		}
	})