define(['jquery',
	'backbone',
	'underscore',
	'text!js/admin/tpl/aFinanceDashboard.tpl',
	'js/admin/views/abarChartView',
	'd3'
	],function($,Backbone,_,Template,abarChartView ,d3){
		"use strict"

		var aFinanceView = Backbone.View.extend({
			template: _.template(Template),

			initialize:function(){
			},

			getData:function(){
				var data;
				$.ajax({
					url: contextUrl + '/admin/finances/orders/getLastThirtyProfitRecords',
					async: false,
					type: 'GET',
					success: function(resp){
						data = resp
					}
				})
				var dat = [];
				_.each(data,function(val){
					dat.push(val.profit)
					// (val.profit<0)?(dat.push(-1*val.profit)):(dat.push(val.profit))
				})
				return dat;
			},

			getCounts:function(){
				var values=[];
				var data = {
					"CurrentSlotOrderCount":"getCurrentSlotCount",
					"PreviousSlotOrderCount":"getPreviousSlotCount",
					"CurrentSlotIncome":"getCurrentSlotIncome",
					"PreviousSlotIncome":"getPreviousSlotIncome",
					"PreviousSlotProfit":"getPreviousSlotProfit",
				};
				_.each(data,function(val){
					$.ajax({
						url:contextUrl + '/admin/finances/orders/'+val,
						type:'GET',
						async:false,
						success:function(data){
							values.push(data)
						}
					})
				})
			return {
				    values: values,
					data: data
				}
			},

		render: function(){
			var values = this.getCounts();
			this.$el.html(this.template({data: values.values}))
			this.$el.find('div.plot-1').append(new abarChartView.abarChartView({
					data: this.getData(),
					ylabel: "Price in Rs.",
					xlabel: "Dates",
					width: $(window).width()*0.37,
					height: 320,
					className: 'bar',
					altClassName: 'bar-negitive',
					xFormat: 'Dates',
					xAxisHeight: 40,
					xtickRotate: 0,
					xTickdx:"1em",
					xTickdy:"1em"
				}).render().el)
			return this
		}

	})
		return {
			aFinanceView: aFinanceView
		}
	})