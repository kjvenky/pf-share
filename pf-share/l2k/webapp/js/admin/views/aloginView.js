define(['jquery',
	'backbone',
	'underscore',
	'text!js/admin/tpl/aLogin.tpl',
	'js/admin/views/aheaderView'
	],function($,Backbone,_,Template,aheaderView){

		"use strict"

		var aloginView = Backbone.View.extend({
			template: _.template(Template),
			
			initialize:function(){
				_.bindAll(this,'render');
				},

			events:{

			},

			render: function(){	
				this.$el.append(this.template())
				return this
			}

	})
		return {
			aloginView: aloginView
		}
	})