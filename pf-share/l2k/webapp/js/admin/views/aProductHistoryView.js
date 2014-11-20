define(['jquery',
	'backbone',
	'underscore',
	'text!js/admin/tpl/aProductHistory.tpl',
	'js/admin/views/aheaderView',
	'js/admin/views/aloginView',
	'js/admin/views/abarChartView',
	'js/admin/views/aTableView',
	'd3'
	],function($,Backbone,_,aProductHistory,aheaderView,aloginView,abarChartView,aTableView){

		"use strict"

		var aProductHistoryView = Backbone.View.extend({
			template: _.template(aProductHistory),
			
			initialize:function(){
				this.data = this.getProducts()
			},

			events:{
				"change #productName": "redraw"
			},

			// Data plots using d3. Reusuable bar chart?
			redraw:function(){
				console.log("I am here");
				var productName = this.$el.find('#productName').val()
				this.data = this.getData(productName)
				var sellingPrice = [];
				_.each(this.data,function(val){
					sellingPrice.push(val.sellingPrice)
				})	
				var buyingPrice = [];
				_.each(this.data,function(val){
					buyingPrice.push(val.buyingPrice)
				})

				this.$el.find('div.plot-1').html(new abarChartView.abarChartView({
					data: buyingPrice,
					ylabel: "Price in Rs.",
					xlabel: "Dates",
					width: $(window).width()*0.37,
					height: 320,
					className: 'bar',
					xFormat: 'Dates',
					xAxisHeight: 40,
					xtickRotate: 0,
					xTickdx:"1em",
					xTickdy:"1em"
				}).render().el)				
				this.$el.find('div.plot-2').html(new abarChartView.abarChartView({
					data: sellingPrice,
					ylabel: "Price in Rs.",
					xlabel: "Dates",
					width: $(window).width()*0.37,
					height: 320,
					className: 'bar',
					xFormat: 'Dates',
					xAxisHeight: 40,
					xtickRotate: 0,
					xTickdx:"1em",
					xTickdy:"1em"
				}).render().el)
				this.renderTable()
			},

			getData: function(productName){
				var data;
				$.ajax({
					url: contextUrl + '/admin/products/getPriceHistory?productName='+productName,
					async: false,
					type: 'GET',
					success: function(resp){
						data = resp
					}
				})
				return data;
			},

	        getProducts: function() {
	            var that = this
	            $.ajax({
	                url: contextUrl + '/product/list',
	                async: false,
	                success: function(data) {
	                    that.products = data
	                }
	            })
	        },

			renderTable:function(){
				this.$el.find(".table").html(new aTableView.aTableView({
						data : this.data,
						title: "Product History Table",
						headings:["S.No",					
						// "productName",																	
						"sellingPrice",
						"buyingPrice",
						],
						mapping:["S.No",
						// "Product Name",																
						"Selling Price",
						"Buying Price"
						],
						type:"recordstable"
					}).render().el)
			},

			render: function(){
				this.$el.html(this.template({products: this.products}))
				this.data = this.getData(this.products[0].productName)
				var sellingPrice = [];
				_.each(this.data,function(val){
					sellingPrice.push(val.sellingPrice)
				})	
				var buyingPrice = [];
				_.each(this.data,function(val){
					buyingPrice.push(val.buyingPrice)
				})
				var prices = this.getData(this.products[0].productName)
				this.$el.find('div.plot-1').html(new abarChartView.abarChartView({
					data: buyingPrice,
					ylabel: "Price in Rs.",
					xlabel: "Dates",
					width: $(window).width()*0.37,
					height: 320,
					className: 'bar',
					xFormat: 'Dates',
					xAxisHeight: 40,
					xtickRotate: 0,
					xTickdx:"1em",
					xTickdy:"1em"
				}).render().el)				
				this.$el.find('div.plot-2').html(new abarChartView.abarChartView({
					data: sellingPrice,
					ylabel: "Price in Rs.",
					xlabel: "Dates",
					width: $(window).width()*0.37,
					height: 320,
					className: 'bar',
					xFormat: 'Dates',
					xAxisHeight: 40,
					xtickRotate: 0,
					xTickdx:"1em",
					xTickdy:"1em"
				}).render().el)
				this.renderTable()
				return this
			}

		})
		return {
			aProductHistoryView: aProductHistoryView
		}
	})