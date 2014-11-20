define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/history.tpl',
	'js/utils/userUtils',
	'js/utils/jsonUtils',
	'bootstrap'
	],function($,Backbone,_,Template,userUtils,Utils){
		"use strict"
		// Add regex and validation to this
		var historyView = Backbone.View.extend({
			template: _.template(Template),
			initialize:function(options){
				this.type = options.type || undefined
			},
			events:{
				'click #closemessage': "closemessages"
			},
			oData:function(){
				var oData = []
				$.ajax({
					type : 'GET',
					async:false,
					url : contextUrl+ '/user/ordersHistory?username='+ app.session.attributes.username,
					success : function(data) {
						oData = data
					}
				})				
				return oData
			},
			tData:function(){
				var tData = []
				$.ajax({
					type : 'GET',
					async:false,
					url : contextUrl+ '/user/transactionHistory?username='+ app.session.attributes.username,
					success : function(data) {
						tData = data
					}
				})
				return tData
			},
			closemessages : function() {
				$('#messages').slideUp(function() {
					$(this).html();
				})
			},
			render: function() {
				this.$el.html(this.template({
					oData: this.oData(),
					tData: this.tData(),
					type: this.type
				}));
				return this;
			}
		});
		
		return {
			historyView: historyView
		}
	})