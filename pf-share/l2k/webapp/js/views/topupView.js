define(
		[ 'jquery', 'backbone', 'underscore', 'text!js/tpl/topup.tpl', ],
		function($, Backbone, _, Template) {

			"use strict"

			var topupView= Backbone.View.extend({
						template : _.template(Template),
						initialize : function() {
							this.render(); // Renders the requried view
						},

						events : { 
						},
						
						render : function() {
							return this.$el.html(this.template())
						}

					})
			return {
				topupView: topupView
			}
		})