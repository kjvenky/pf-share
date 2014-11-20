define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/modalTemplate.tpl'
	],function($,Backbone,_,Template){

		"use strict"

		var modalView = Backbone.View.extend({
			tagName: 'p',
			template: 'this is modal content',
			render: function() {
				this.$el.html(this.template);
				return this;
			}
		});
		
		return {
			modalView: modalView
		}
	})