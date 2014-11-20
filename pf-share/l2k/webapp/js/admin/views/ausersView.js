define(['jquery',
	'backbone',
	'underscore',
	'text!js/admin/tpl/aindex.tpl',
	],function($,Backbone,_,aindexTemplate){

		"use strict"

		var ausersView = Backbone.View.extend({
			template: _.template(aindexTemplate),
			
			initialize:function(){
				_.bindAll(this,'render');
				this.render(); // Renders the requried view
				},

			events:{
			},
			
			render: function(){			
			return this
		}

	})
		return {
			ausersView: ausersView
		}
	})