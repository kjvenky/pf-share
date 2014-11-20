define(['jquery',
	'backbone',
	'underscore',
	'text!js/admin/tpl/aOrderDashboard.tpl',
	],function($,Backbone,_,Template){

		"use strict"

		var aOrderDashboardView = Backbone.View.extend({
			template: _.template(Template),
			
			initialize:function(){
				_.bindAll(this,'render');
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

			getDeliveryOrderCount: function(){
				var d = new Date()
				var dString = d.getDate()+":"+(d.getMonth()+1)+":"+d.getFullYear()+"+"+d.getSeconds()+":"+d.getMinutes()+":"+d.getHours()
				var count = 0;
				// $.ajax({
				// 	url: contextUrl + '/admin/orders/process_orders/getFreshOrdersCount?latestTime='+dString,
				// 	type:'GET',
				// 	async: false,
				// 	success:function(data){
				// 		count = data
				// 	}
				// })
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
				this.$el.append(this.template({
					freshOrderCount: 1,
					openOrderCount: this.getOpenOrderCount()
				}))
				return this
			}

	})
		return {
			aOrderDashboardView: aOrderDashboardView
		}
	})